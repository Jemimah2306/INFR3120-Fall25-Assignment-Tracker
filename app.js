// app.js
require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const app = express();

// connect to mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));
  
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => res.render("index", { title: "Home" }));

// 404 handler
app.use((req, res) => {
    res.status(404).render("error", { message: "Page not found", error: {}, title: "Error" });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', { message: err.message, error: err, title: 'Error' });
});

// Export the app only
module.exports = app;