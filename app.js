const express = require("express");
const path = require("path");
//const mongoose = require("mongoose");
const app = express();

//mongoose.connect("mongodb://localhost:27017/perfectplanner")
    //.then(() => console.log("MongoDB Connected"))
    //.catch(err => console.error("Database Error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample tasks data for testing before MongoDB
const tasksData = [
    { _id: "1", title: "Math Assignment", description: "Chapter 5 exercises", dueDate: "2025-11-25", status: "Not Started" },
    { _id: "2", title: "English Essay", description: "Write 1000 words", dueDate: "2025-11-27", status: "In Progress" },
    { _id: "3", title: "Science Project", description: "Volcano model", dueDate: "2025-11-30", status: "Completed" },
];

// Make tasks data accessible in request
app.use((req, res, next) => {
    req.tasksData = tasksData;
    next();
});

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// Error handler for 404
app.use((req, res, next) => {
    res.status(404).render("error", {
        message: "Page not found",
        error: { status: 404, stack: "" },
        title: "Error"
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', {
        message: err.message,
        error: err,
        title: 'Error'
    });
});

module.exports = app;
