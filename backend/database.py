import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="budget_mate"
    )
# print("Connected successfully")

def close_connection(conn, cursor=None):
    if cursor:
        cursor.close()
    if conn:
        conn.close()