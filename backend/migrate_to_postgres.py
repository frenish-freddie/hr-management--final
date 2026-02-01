import sqlite3
import psycopg2
import os
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load environment variables (to get the Supabase URL)
load_dotenv()

SQLITE_DB_PATH = "hr_management_v5.db"
POSTGRES_URL = os.getenv("DATABASE_URL")

def migrate_data():
    if not POSTGRES_URL or "sqlite" in POSTGRES_URL:
        print("❌ Error: DATABASE_URL in .env seems to be missing or still set to sqlite.")
        print("Please update .env with your Supabase connection string.")
        return

    print(f"🚀 Starting migration from {SQLITE_DB_PATH} to Supabase...")

    # 1. Connect to SQLite
    try:
        sqlite_conn = sqlite3.connect(SQLITE_DB_PATH)
        sqlite_conn.row_factory = sqlite3.Row
        sqlite_cursor = sqlite_conn.cursor()
        print("✅ Connected to SQLite")
    except Exception as e:
        print(f"❌ Failed to connect to SQLite: {e}")
        return

    # 2. Connect to PostgreSQL (Supabase)
    try:
        # Parse the URL to handle special characters if needed, or pass directly
        pg_conn = psycopg2.connect(POSTGRES_URL)
        pg_cursor = pg_conn.cursor()
        print("✅ Connected to PostgreSQL (Supabase)")
    except Exception as e:
        print(f"❌ Failed to connect to Supabase: {e}")
        print("Check your connection string and password in .env")
        return

    # 3. Migrate Tables
    # We assume the tables are ALREADY created by the FastAPI app startup.
    # If not, run the backend once against Supabase.
    
    tables_to_migrate = [
        "employees",
        "employee_management",
        "jobs",
        "applications"
    ]

    for table in tables_to_migrate:
        print(f"\n📦 Migrating table: {table}...")
        
        # Read from SQLite
        try:
            sqlite_cursor.execute(f"SELECT * FROM {table}")
            rows = sqlite_cursor.fetchall()
            if not rows:
                print(f"   ⚠️ No data in {table} (skipping)")
                continue
            
            # Get column names
            columns = [description[0] for description in sqlite_cursor.description]
            columns_str = ", ".join(columns)
            placeholders = ", ".join(["%s"] * len(columns))
            
            print(f"   Found {len(rows)} rows.")

            # Insert into Postgres
            query = f"INSERT INTO {table} ({columns_str}) VALUES ({placeholders}) ON CONFLICT DO NOTHING"
            
            for row in rows:
                # Convert row to tuple
                values = tuple(row)
                pg_cursor.execute(query, values)
            
            pg_conn.commit()
            print(f"   ✅ Successfully migrated {table}")

        except Exception as e:
            print(f"   ❌ Error migrating {table}: {e}")
            pg_conn.rollback()

    # Close connections
    sqlite_conn.close()
    pg_cursor.close()
    pg_conn.close()
    print("\n✨ Migration completed!")

if __name__ == "__main__":
    migrate_data()
