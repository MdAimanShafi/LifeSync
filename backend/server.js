const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LifeSync@123%KU", 
  database: "login_system", 
});

db.connect((err) => {
  if (err) {
    console.log("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  console.log("📩 GET / route hit successfully");
  res.send("👋 Hello! Backend is working!");
});

// ✅ LOGIN route
app.post("/api/login", (req, res) => {
  const {
    email,
    password,
    loginTime,
    ipAddress,
    userAgent,
    sessionId,
    deviceInfo: { platform, language }
  } = req.body;

  const sql = `
    INSERT INTO login_data 
    (email, password, login_time, ip_address, user_agent, session_id, platform, language)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [email, password, loginTime, ipAddress, userAgent, sessionId, platform, language];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting login data:", err.message);
      return res.status(500).json({ error: "Failed to save login data" });
    }
    console.log("✅ Login data saved:", result);
    res.status(200).json({ message: "Login data saved successfully!" });
  });
});

// ✅ Start server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
