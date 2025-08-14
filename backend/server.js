const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
// require("dotenv").config({ path: path.join(__dirname, '../.env') });

const mongoose = require("mongoose");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// nodemon server.js



// Serve static files
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend')));

// MongoDB Connection to "Todolist" database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to Todolist database");
    })
    .catch((err) => console.error("Mongodb connection error:", err));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
// });
app.use(express.static(path.resolve(__dirname, '../frontend')));
// API endpoint to test database connection
// app.get("/api/test-db", (req, res) => {
//   mongoose.connection.db.admin().ping((err, result) => {
//     if (err) {
//       res.status(500).json({ message: "MongoDB connection failed", error: err.message });
//     } else {
//       res.json({ message: "Connected to Todolist database successfully" });
//     }
//   });
// });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

