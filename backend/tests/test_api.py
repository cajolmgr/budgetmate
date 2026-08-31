import requests

BASE_URL = "http://localhost:8000"


def test_api_is_running():
    response = requests.get(f"{BASE_URL}/docs")
    assert response.status_code == 200


def test_add_income():
    data = {
        "user_id": 1,
        "amount": 1000.00,
        "source": "Salary",
        "payment_method": "Bank Transfer",
        "income_date": "2026-08-31",
        "note": "CI test income"
    }

    response = requests.post(
        f"{BASE_URL}/add-income",
        json=data
    )

    assert response.status_code == 200
    assert response.json()["message"] == "income added"