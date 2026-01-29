import random
from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Employee, Job, Application, EmployeeManagement

db: Session = SessionLocal()

# ---------- EMPLOYEES ----------
for i in range(1, 101):
    emp = Employee(
        emp_id=f"EMP{i:03}",
        name=f"Employee {i}",
        email=f"emp{i}@aptivora.it",
        password="password123",
        role="junior_hr" if i % 2 == 0 else "senior_hr",
        seniority="junior" if i % 2 == 0 else "senior"
    )
    db.add(emp)
db.commit()

# ---------- JOBS ----------
for i in range(1, 101):
    job = Job(
        job_title=random.choice(["Software Engineer", "HR Executive", "Backend Developer", "Frontend Developer", "DevOps Engineer", "QA Engineer", "Product Manager"]),
        job_description="Responsible for assigned role",
        expected_close_date=date.today() + timedelta(days=random.randint(10, 90)),
        budget=random.randint(300000, 1500000),
        emp_id=f"EMP{random.randint(1,100):03}"
    )
    db.add(job)
db.commit()

# ---------- APPLICATIONS ----------
for i in range(1, 101):
    ctc = random.randint(200000, 800000)
    app = Application(
        job_id=random.randint(1, 100),
        name=f"Applicant {i}",
        email=f"applicant{i}@gmail.com",
        phone=f"9{random.randint(100000000,999999999)}",
        resume=f"/resumes/applicant{i}.pdf",
        experience=round(random.uniform(0, 10), 1),
        ctc=ctc,
        expected_ctc=ctc + random.randint(50000, 200000)
    )
    db.add(app)
db.commit()

# ---------- EMPLOYEE MANAGEMENT ----------
for i in range(1, 101):
    em = EmployeeManagement(
        emp_id=f"EMP{i:03}",
        personal={
            "employee_code": f"EMP{i:03}",
            "name": {"first_name": f"Emp{i}", "last_name": "User"},
            "contact": {"email": f"emp{i}@aptivora.it", "phone": f"9{random.randint(100000000,999999999)}"},
            "dob": "1998-01-01",
            "gender": "Female" if i % 2 == 0 else "Male",
            "blood_group": "O+",
            "marital_status": "Single",
            "address": {"house": "H1", "street": "Main", "city": "Kochi", "state": "Kerala", "pincode": "680001"},
            "emergency_contact": {"name": "Parent", "relation": "Father", "phone": "9876543210"}
        },
        employment={
            "role": "Staff",
            "designation": random.choice(["Developer", "Manager", "Analyst", "HR Executive"]),
            "department": random.choice(["IT", "HR", "Finance", "Operations"]),
            "employment_type": "Full-Time",
            "date_of_joining": "2023-01-01",
            "work_location": random.choice(["Remote", "Kochi", "Bangalore", "Mumbai"]),
            "manager_id": "EMP001",
            "manager_name": "Employee 1",
            "status": "Active"
        },
        compensation=[
            {"type": "CTC", "amount": random.randint(300000, 900000)}
        ]
    )
    db.add(em)
db.commit()

print("✅ 100 dummy records inserted successfully")
