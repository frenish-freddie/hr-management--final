from pydantic import BaseModel, EmailStr, field_validator
from datetime import date
from typing import List, Dict, Any, Optional

class RegisterUser(BaseModel):
    emp_id: str
    name: str
    email: EmailStr
    password: str
    confirm_password: str
    role: str
    seniority: Optional[str] = None
    team_name: Optional[str] = None

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v


class LoginUser(BaseModel):
    emp_id: str
    password: str

class JobCreate(BaseModel):
    job_title: str
    job_description: str
    expected_close_date: date
    budget: float
    emp_id: str


class JobResponse(BaseModel):
    id: int
    job_title: str
    job_description: str
    expected_close_date: date
    budget: float
    emp_id: str

    class Config:
        from_attributes = True



class ApplicationCreate(BaseModel):
    job_id: int
    name: str
    email: EmailStr
    phone: str
    resume: Optional[str] = None  # store filename/path
    experience: float
    ctc: float
    expected_ctc: float

class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    name: str
    email: EmailStr
    phone: str
    resume: Optional[str]
    experience: float
    ctc: float
    expected_ctc: float

    class Config:
        from_attributes = True





class BankDetails(BaseModel):
    bank_name: str
    account_number: str
    ifsc_code: str


class CompensationItem(BaseModel):
    basic_salary: float
    hra: float
    allowances: float
    bonus: float
    pf: float
    tax: float
    advances: float = 0.0
    net_salary: float
    payment_date: Optional[date] = None
    bank_details: BankDetails
     

class EmployeeManagementSchema(BaseModel):
    personal: Optional[Dict[str, Any]] = None
    employment: Optional[Dict[str, Any]] = None
    compensation: Optional[List[Dict[str, Any]]] = []
    attendance: Optional[Dict[str, Any]] = None
    assets: Optional[Dict[str, Any]] = None
    documents: Optional[Dict[str, Any]] = None
    exit_details: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


    bank_details: Optional[dict] = {}


class RecentApplication(BaseModel):
    name: str
    job_title: str
    applied_on: date

class DashboardStats(BaseModel):
    total_jobs: int
    total_applications: int
    total_junior_hrs: int
    recent_applications: List[RecentApplication]


class EmployeeFullResponse(BaseModel):
    emp_id: str
    name: str
    email: EmailStr
    role: str
    seniority: Optional[str]
    team_name: Optional[str]
    management: Optional[EmployeeManagementSchema] = None

    class Config:
        from_attributes = True

class EmployeeCreateFull(BaseModel):
    emp_id: str
    name: str
    email: EmailStr
    password: str
    role: str
    seniority: Optional[str] = None
    team_name: Optional[str] = None
    # Management fields
    personal: Optional[dict] = None
    employment: Optional[dict] = None
    compensation: Optional[List[dict]] = []
    attendance: Optional[dict] = None
    assets: Optional[dict] = None
    documents: Optional[dict] = None
    exit_details: Optional[dict] = None
