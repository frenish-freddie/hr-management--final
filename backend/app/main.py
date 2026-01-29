from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from typing import List, Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app import models, schemas
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.auth import router as auth_router


models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Login System")

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    import traceback
    with open("crash_log.txt", "a") as f:
        f.write(f"\n\nERROR: {str(exc)}\n")
        f.write(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)},
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix="/auth")

@app.get("/")
def home():
    return {"status": "Backend is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/stats", response_model=schemas.DashboardStats)
def get_stats(db: Session = Depends(get_db)):
    total_jobs = db.query(models.Job).count()
    total_applications = db.query(models.Application).count()
    total_junior_hrs = db.query(models.Employee).filter(models.Employee.role == "junior_hr").count()

    recent_apps = db.query(models.Application, models.Job.job_title)\
        .join(models.Job, models.Application.job_id == models.Job.id)\
        .order_by(models.Application.created_at.desc())\
        .limit(5).all()

    formatted_recent = [
        schemas.RecentApplication(
            name=app.name,
            job_title=job_title,
            applied_on=app.created_at.date()
        ) for app, job_title in recent_apps
    ]

    return schemas.DashboardStats(
        total_jobs=total_jobs,
        total_applications=total_applications,
        total_junior_hrs=total_junior_hrs,
        recent_applications=formatted_recent
    )


@app.post("/jobs", response_model=schemas.JobResponse)
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    new_job = models.Job(
        job_title=job.job_title,
        job_description=job.job_description,
        expected_close_date=job.expected_close_date,
        budget=job.budget,
        emp_id=job.emp_id
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job


@app.get("/jobs", response_model=List[schemas.JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(models.Job).all()
    return jobs

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Delete associated applications first
    db.query(models.Application).filter(models.Application.job_id == job_id).delete(synchronize_session=False)
    
    # Delete the job
    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}
# 🔹 POST: Apply to a job
@app.post("/applications/", response_model=schemas.ApplicationResponse)
async def apply_job(
    job_id: int,
    name: str,
    email: str,
    phone: str,
    experience: float,
    ctc: float,
    expected_ctc: float,
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    import os
    os.makedirs("resumes", exist_ok=True)

    file_location = f"resumes/{resume.filename}"
    with open(file_location, "wb") as f:
        f.write(await resume.read())

    new_app = models.Application(
        job_id=job_id,
        name=name,
        email=email,
        phone=phone,
        experience=experience,
        ctc=ctc,
        expected_ctc=expected_ctc,
        resume=file_location
    )

    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

# 🔹 GET: View applications for a job (HR)
@app.get("/applications/{job_id}", response_model=List[schemas.ApplicationResponse])
def get_applications(job_id: int, db: Session = Depends(get_db)):
    apps = db.query(models.Application).filter(models.Application.job_id == job_id).all()
    if not apps:
        raise HTTPException(status_code=404, detail="No applications found for this job")
    return apps

# 🔹 GET: View ALL applications (for Candidate Status page)
@app.get("/applications/all/list")
def get_all_applications(db: Session = Depends(get_db)):
    apps = db.query(models.Application, models.Job.job_title)\
        .join(models.Job, models.Application.job_id == models.Job.id)\
        .order_by(models.Application.created_at.desc())\
        .all()
    
    result = []
    for app, job_title in apps:
        result.append({
            "id": app.id,
            "job_id": app.job_id,
            "job_title": job_title,
            "name": app.name,
            "email": app.email,
            "phone": app.phone,
            "resume": app.resume,
            "experience": app.experience,
            "ctc": app.ctc,
            "expected_ctc": app.expected_ctc,
            "status": app.status or "Applied",
            "created_at": app.created_at
        })
    return result

# 🔹 PATCH: Update application status
@app.patch("/applications/{app_id}/status")
def update_application_status(app_id: int, status: str, db: Session = Depends(get_db)):
    app = db.query(models.Application).filter(models.Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = status
    db.commit()
    return {"message": "Status updated successfully", "new_status": status}


# --- Employee Management ---

@app.get("/employees", response_model=List[schemas.EmployeeFullResponse])
def get_all_employees(db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()
    return employees

@app.post("/employees/full", response_model=schemas.EmployeeFullResponse)
def create_employee_full(user: schemas.EmployeeCreateFull, db: Session = Depends(get_db)):
    from app.auth import hash_password

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
        seniority=user.seniority,
        team_name=user.team_name
    )
    db.add(new_user)
    
    mgmnt = models.EmployeeManagement(
        emp_id=user.emp_id,
        personal=user.personal or {},
        employment=user.employment or {},
        compensation=user.compensation or [],
        assets=user.assets or {},
        attendance=user.attendance or {},
        documents=user.documents or {},
        exit_details=user.exit_details or {}
    )
    db.add(mgmnt)
    
    db.commit()
    db.refresh(new_user)
    return new_user

@app.put("/employees/{emp_id}/management")
def update_employee_management(
    emp_id: str,
    data: schemas.EmployeeManagementSchema,
    db: Session = Depends(get_db)
):
    mgmnt = db.query(models.EmployeeManagement).filter(models.EmployeeManagement.emp_id == emp_id).first()
    if not mgmnt:
        raise HTTPException(status_code=404, detail="Employee management record not found")

    if data.personal is not None: mgmnt.personal = data.personal
    if data.employment is not None: mgmnt.employment = data.employment
    if data.compensation is not None: mgmnt.compensation = data.compensation
    if data.attendance is not None: mgmnt.attendance = data.attendance
    if data.assets is not None: mgmnt.assets = data.assets
    if data.documents is not None: mgmnt.documents = data.documents
    
    db.commit()
    return {"message": "Employee management updated successfully"}

@app.get("/employees/{emp_id}", response_model=schemas.EmployeeFullResponse)
def get_employee_full(emp_id: str, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.emp_id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@app.delete("/employees/batch")
def delete_employees(emp_ids: List[str], db: Session = Depends(get_db)):
    # 1. Delete management records
    db.query(models.EmployeeManagement).filter(models.EmployeeManagement.emp_id.in_(emp_ids)).delete(synchronize_session=False)
    
    # 2. Delete employee records
    count = db.query(models.Employee).filter(models.Employee.emp_id.in_(emp_ids)).delete(synchronize_session=False)
    
    db.commit()
    return {"message": f"Successfully removed {count} employee(s)"}