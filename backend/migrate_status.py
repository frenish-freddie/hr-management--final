# Run this script to add the status column to existing applications
from sqlalchemy import text
from app.database import engine

with engine.connect() as conn:
    try:
        conn.execute(text('ALTER TABLE applications ADD COLUMN status VARCHAR DEFAULT "Applied"'))
        conn.commit()
        print("✅ Added status column to applications table")
    except Exception as e:
        if "duplicate column" in str(e).lower():
            print("✅ Status column already exists")
        else:
            print(f"Error: {e}")
