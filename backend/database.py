import os

import psycopg2


def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME", "budgetmate"),
    )


def close_connection(conn, cursor=None):
    if cursor:
        cursor.close()
    if conn:
        conn.close()
