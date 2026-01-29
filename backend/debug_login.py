import requests
import json

BASE_URL = "http://localhost:8000"

def test_flow():
    # 1. Register a new user
    import time
    unique_id = int(time.time())
    user_data = {
        "emp_id": f"TEST_{unique_id}",
        "name": "Test User",
        "email": f"test{unique_id}@example.com",
        "password": "password123",
        "role": "senior_hr",
        "seniority": "mid"
    }
    
    print(f"Attempting to register user: {user_data['emp_id']}")
    try:
        reg_res = requests.post(f"{BASE_URL}/auth/register", json=user_data)
        print(f"Register Status: {reg_res.status_code}")
        print(f"Register Response: {reg_res.text}")
    except Exception as e:
        print(f"Registration failed connection: {e}")
        return

    # 2. Login
    print("\nAttempting to login...")
    login_data = {
        "emp_id": user_data["emp_id"],
        "password": "password123"
    }
    try:
        login_res = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Login Status: {login_res.status_code}")
        print(f"Login Response: {login_res.text}")
    except Exception as e:
        print(f"Login failed connection: {e}")

if __name__ == "__main__":
    test_flow()
