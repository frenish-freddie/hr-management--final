from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import hashlib

from app.database import get_db
from app import models, schemas

router = APIRouter(tags=["Auth"])



def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

@router.post("/register")
def register(user: schemas.RegisterUser, db: Session = Depends(get_db)):

    existing_id = db.query(models.Employee).filter(models.Employee.emp_id == user.emp_id).first()
    if existing_id:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    existing_email = db.query(models.Employee).filter(models.Employee.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.Employee(
        emp_id=user.emp_id,
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
        seniority=user.seniority
    )

    # ✅ Create corresponding EmployeeManagement record
    mgmnt_record = models.EmployeeManagement(emp_id=user.emp_id)

    db.add(new_user)
    db.add(mgmnt_record)
    db.commit()

    return {"message": "Registration successful"}



@router.post("/login")
def login(user: schemas.LoginUser, db: Session = Depends(get_db)):

    db_user = db.query(models.Employee).filter(
        models.Employee.emp_id == user.emp_id
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid employee ID")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "message": "Login successful",
        "access_token": "mock-token",  # In a real app, generate a JWT
        "role": db_user.role,
        "seniority": db_user.seniority,
        "name": db_user.name,
        "emp_id": db_user.emp_id
    }
