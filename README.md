# 📊 Online Attendance System (MERN Stack)

## 🚀 Project Overview

Online Attendance System ek full-stack web application hai jisme students ki attendance manage ki ja sakti hai.
Is project me CRUD operations use karke attendance records add, view, update aur delete kiye ja sakte hain.

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   └── attendanceRoutes.js
│   │   ├── models/
│   │   │   └── attendanceModel.js
│   │   ├── controllers/
│   │   │   └── attendanceController.js
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── index.html
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/attendance-system.git
cd attendance-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/attendance
```

Run backend:

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 📌 API Endpoints

### ➤ Get All Attendance

```
GET /attendance
```

### ➤ Add Attendance

```
POST /attendance
```

Body:

```json
{
  "rollNo": 101,
  "studentName": "Rahul",
  "date": "2026-03-08",
  "status": "Present",
  "subject": "Math",
  "createdBy": "Teacher"
}
```

---

### ➤ Update Attendance

```
PUT /attendance/:id
```

---

### ➤ Delete Attendance

```
DELETE /attendance/:id
```

---

## ✨ Features

* Add student attendance
* View attendance list
* Update attendance
* Delete attendance
* Full CRUD operations
* REST API integration
* Responsive UI (Tailwind CSS)

---

## 🧪 Testing (Postman)

Use Postman to test API endpoints:

* POST → Add record
* GET → Fetch records
* PUT → Update record
* DELETE → Remove record

---

## ⚠️ Common Issues & Fixes

### ❌ 404 Error

Check correct API URL:

```
http://localhost:3000/attendance
```

### ❌ CORS Error

Ensure backend me:

```js
app.use(cors());
```

### ❌ No Data Showing

* Check MongoDB connection
* Ensure data inserted properly

---

## 👨‍💻 Author

Yash singh

---

## 📄 License

This project is open-source and free to use.
