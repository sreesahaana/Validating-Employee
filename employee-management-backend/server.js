const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "nSREE@2911#", // replace with your MySQL password
  database: "employeeDB", // replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Create the table if it doesn't exist
connection.query(`
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employeeId VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10) NOT NULL,
    department VARCHAR(100) NOT NULL,
    dateOfJoining DATE NOT NULL,
    role VARCHAR(100) NOT NULL
  )
`, (err, result) => {
  if (err) {
    console.error("Error creating table: ", err);
  } else {
    console.log("Table 'employees' is ready.");
  }
});

// API Endpoints
app.post(
  "/api/employees",
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      employeeId: Joi.string().max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^\d{10}$/).required(),
      department: Joi.string().required(),
      dateOfJoining: Joi.date().max("now").required(),
      role: Joi.string().required(),
    }),
  }),
  (req, res) => {
    const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;
    const query = `
      INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [name, employeeId, email, phone, department, dateOfJoining, role], (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Employee ID or Email already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({ message: "Employee added successfully" });
    });
  }
);

// Error Handler
app.use(errors());

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

