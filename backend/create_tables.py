from app.database import engine
from app import models

print("Creating tables in database...")
try:
    models.Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully.")
except Exception as e:
    print(f"❌ Error creating tables: {e}")
