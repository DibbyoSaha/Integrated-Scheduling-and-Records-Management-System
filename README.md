# Integrated-Scheduling-and-Records-Management-System
A web application that provides an integrated scheduling and records management system using React (frontend) and Flask (backend). The application allows users to create, view, and manage bookings via a calendar interface.

## 📌 Features

- View upcoming events in a calendar.
- Add new bookings via a form.
- Delete bookings by clicking on them.
- Backend API for booking management.
- Styled using Tailwind CSS.

---

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, FullCalendar, TailwindCSS
- **Backend**: Flask, SQLite
- **Styling**: Tailwind CSS

---

## 📂 Project Structure

```
/scheduling-system
│── /backend                # Flask Backend
│   │── app.py              # Main Flask App
│   │── bookings.db         # SQLite Database
│   │── venv/               # Virtual Environment
│── /frontend               # React Frontend
│   │── src/
│   │   ├── App.tsx         # Main App Component
│   │   ├── CalendarView.tsx # Calendar Component
│   │   ├── index.tsx       # React Entry Point
│   │   ├── index.css       # Global Styles
│── README.md               # Project Documentation
```

---

## 🛠️ Installation & Setup

### 🔹 Backend (Flask)

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Mac/Linux
   venv\Scripts\activate     # On Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```sh
   python app.py
   ```

### 🔹 Frontend (React)

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

---

## 📡 API Endpoints

### 🔹 Get All Bookings

```http
GET /bookings
```

Response:

```json
[]
```

### 🔹 Create a New Booking

```http
POST /bookings
```

Request Body:

```json
{
  "title": "Meeting with John",
  "date": "2025-02-20"
}
```

Response:

```json
{
  "id": 1,
  "title": "Meeting with John",
  "date": "2025-02-20"
}
```

### 🔹 Delete a Booking

```http
DELETE /bookings/<id>
```

Response:

```json
{
  "message": "Booking deleted successfully"
}
```

---
