import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:8000"

def test_create_job():
    url = f"{BASE_URL}/jobs"
    payload = {
        "job_title": "Software Engineer",
        "job_description": "Coding things",
        "expected_close_date": "2026-12-31",
        "budget": 100000.0,
        "emp_id": "e1"
    }
    print(f"Testing Create Job: {url}")
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            res_data = response.read().decode('utf-8')
            print(f"Status: {response.getcode()}")
            print(f"Response: {res_data}")
            return True
    except urllib.error.HTTPError as e:
        print(f"Status: {e.code}")
        print(f"Response: {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    test_create_job()
