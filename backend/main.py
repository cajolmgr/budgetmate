from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection, close_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- EXPENSE ----------------
class Expense(BaseModel):
    amount: float
    category: str
    expense_date: str
    payment_method: str
    note: str = ""

@app.post("/add-expense")
def add_expense(expense: Expense):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO expenses
    (user_id, amount, category, expense_date, payment_method, note)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (
        1,
        expense.amount,
        expense.category,
        expense.expense_date,
        expense.payment_method,
        expense.note
    ))

    conn.commit()
    close_connection(conn, cursor)

    return {"message": "expense added"}


# ---------------- INCOME ----------------
class Income(BaseModel):
    amount: float
    source: str
    payment_method: str
    income_date: str
    note: str = ""

@app.post("/add-income")
def add_income(income: Income):
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    INSERT INTO income
    (user_id, amount, source, payment_method, income_date, note)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (
    1,
    income.amount,
    income.source,
    income.payment_method,
    income.income_date,
    income.note
    ))

    conn.commit()
    close_connection(conn, cursor)

    return {"message": "income added"}

@app.get("/income")
def get_income():
    conn = get_connection()
    from psycopg2.extras import RealDictCursor

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("""
        SELECT
            id,
            income_date,
            source,
            note,
            amount,
            payment_method
        FROM income
        ORDER BY income_date DESC
    """)

    data = cursor.fetchall()

    cursor.close()
    close_connection(conn)

    return data