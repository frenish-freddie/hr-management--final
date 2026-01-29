import random
from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import EmployeeManagement

def generate_attendance_data():
    db: Session = SessionLocal()
    
    try:
        employees = db.query(EmployeeManagement).all()
        print(f"Found {len(employees)} employees to update.")

        today = date.today()
        # Generate for last 30 days
        start_date = today - timedelta(days=30)
        
        for emp in employees:
            total_days = 0
            present = 0
            absent = 0
            leaves = 0
            
            monthly_data = {}
            
            # Iterate through last 30 days
            current_date = start_date
            while current_date <= today:
                # Skip weekends (Saturday=5, Sunday=6)
                if current_date.weekday() < 5:
                    total_days += 1
                    
                    # 90% chance of being present
                    status_roll = random.random()
                    status = "Present"
                    
                    if status_roll > 0.95:
                        status = "Absent"
                        absent += 1
                    elif status_roll > 0.90:
                        status = "Leave"
                        leaves += 1
                    else:
                        present += 1
                    
                    month_key = current_date.strftime("%Y-%m")
                    day_key = current_date.strftime("%d")
                    
                    if month_key not in monthly_data:
                        monthly_data[month_key] = {}
                    
                    monthly_data[month_key][day_key] = {
                        "status": status,
                        "date": current_date.strftime("%Y-%m-%d"),
                        "check_in": "09:00" if status == "Present" else None,
                        "check_out": "18:00" if status == "Present" else None
                    }
                
                current_date += timedelta(days=1)

            # Construct the full attendance object
            attendance_payload = {
                "summary": {
                    "total_working_days": total_days,
                    "present_days": present,
                    "absent_days": absent,
                    "leave_days": leaves
                },
                "monthly": monthly_data
            }
            
            # Update the record
            # We assign a new dict to ensure SQLAlchemy detects the change in JSON field
            emp.attendance = attendance_payload
            
        db.commit()
        print("✅ Successfully updated attendance for all employees.")
        
    except Exception as e:
        print(f"❌ Error updating attendance: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    generate_attendance_data()
