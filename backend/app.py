# backend/app.py
from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Database connection info
DB_HOST = "localhost"
DB_NAME = "mydatabase"
DB_USER = "myuser"
DB_PASS = "mypassword"

# Establish a database connection
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json
    with conn.cursor() as cur:
        cur.execute("INSERT INTO users (name, nationality, age) VALUES (%s, %s, %s)",
                    (data['name'], data['nationality'], data['age']))
        conn.commit()
    return jsonify({"message": "Data saved successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
