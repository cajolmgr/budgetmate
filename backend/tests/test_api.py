import requests

BASE_URL = "http://localhost:8000"


def test_api_is_running():
    response = requests.get(f"{BASE_URL}/docs")
    assert response.status_code == 200
