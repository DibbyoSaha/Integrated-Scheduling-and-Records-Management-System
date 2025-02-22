from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    with sqlite3.connect('bookings.db') as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                date TEXT NOT NULL
            )
        ''')
    print("Database initialized!")


# Route to get all bookings
@app.route('/bookings', methods=['GET'])
def get_bookings():
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM bookings')
    bookings = cursor.fetchall()
    conn.close()

    bookings_list = [{'id': row[0], 'title': row[1], 'date': row[2]} for row in bookings]
    return jsonify(bookings_list)


# Route to add a new booking
@app.route('/bookings', methods=['POST'])
def add_booking():
    data = request.json
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO bookings (title, date) VALUES (?, ?)', (data['title'], data['date']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Booking added successfully!"})


# Route to delete a booking
@app.route('/bookings/<int:id>', methods=['DELETE'])
def delete_booking(id):
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM bookings WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": f"Booking with id {id} deleted"})


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
