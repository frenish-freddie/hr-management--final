from app.database import SessionLocal
from app.models import Employee, EmployeeManagement
import json

db = SessionLocal()

# Check Employee
emp = db.query(Employee).filter(Employee.emp_id == "emp1").first()
print(f"Employee emp1 found: {emp is not None}")
if emp:
    print(f"Role: {emp.role}, ID: {emp.id}")

# Check EmployeeManagement
em = db.query(EmployeeManagement).filter(EmployeeManagement.emp_id == "emp1").first()
print(f"EmployeeManagement for emp1 found: {em is not None}")

if em:
    print(f"Attendance Data: {json.dumps(em.attendance, indent=2)}")
else:
    print("Creating missing EmployeeManagement record for emp1...")
    # Create it if missing
    new_em = EmployeeManagement(
        emp_id="emp1",
        personal={"name": {"first_name": "Test", "last_name": "User"}},
        employment={"status": "Active"},
        attendance={
            "summary": {"total_working_days": 20, "present_days": 20, "absent_days": 0, "leave_days": 0},
            "monthly": {}
        }
    )
    db.add(new_em)
    db.commit()
    print("Created.")

db.close()
