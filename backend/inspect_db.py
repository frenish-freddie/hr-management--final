from sqlalchemy import create_engine, inspect
from app.database import Base, engine
from app.models import Employee, Job, Application, EmployeeManagement

def create_and_inspect():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    inspector = inspect(engine)
    for table_name in inspector.get_table_names():
        print(f"\nTable: {table_name}")
        for column in inspector.get_columns(table_name):
            print(f"  Column: {column['name']} ({column['type']})")

if __name__ == "__main__":
    create_and_inspect()
