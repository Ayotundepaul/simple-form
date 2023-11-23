from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Database connection info
DB_HOST = "your_host"
DB_NAME = "your_db"
DB_USER = "your_user"
DB_PASS = "your_pass"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json
    cur = conn.cursor()
    cur.execute("INSERT INTO users (name, nationality, age) VALUES (%s, %s, %s)",
                (data['name'], data['nationality'], data['age']))
    conn.commit()
    return jsonify({"message": "Data saved successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
