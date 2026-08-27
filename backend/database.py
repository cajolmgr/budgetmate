import psycopg2

def get_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        user="postgres",
        password="kajol",
        database="budgetmate"
    )
# print("Connected successfully")

def close_connection(conn, cursor=None):
    if cursor:
        cursor.close()
    if conn:
        conn.close()