import urllib.request
import json
import time

BASE_URL = "http://localhost:8000"

def make_request(endpoint, data=None):
    url = f"{BASE_URL}{endpoint}"
    headers = {'Content-Type': 'application/json'}
    
    try:
        if data:
            req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
        else:
            req = urllib.request.Request(url, headers=headers)
            
        with urllib.request.urlopen(req) as response:
            print(f"Success {endpoint}: {response.status} {response.read().decode('utf-8')}")
            return True
            
    except urllib.error.HTTPError as e:
        print(f"Error {endpoint}: {e.code} {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"Exception {endpoint}: {e}")
        return False

def test_flow():
    # 1. Health check
    print("Checking health...")
    make_request("/api/health")

    # 2. Register
    unique_id = int(time.time())
    user_data = {
        "emp_id": f"TEST_{unique_id}",
        "name": "Test User",
        "email": f"test{unique_id}@example.com",
        "password": "password123",
        "role": "senior_hr",
        "seniority": "mid"
    }
    
    print(f"\nRegistering {user_data['emp_id']}...")
    if make_request("/auth/register", user_data):
        # 3. Login
        print("\nLogging in...")
        login_data = {
            "emp_id": user_data["emp_id"],
            "password": "password123"
        }
        make_request("/auth/login", login_data)

if __name__ == "__main__":
    test_flow()
