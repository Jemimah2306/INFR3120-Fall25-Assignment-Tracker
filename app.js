// app.js
require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
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

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;   // handy in EJS
  next();
});

// Import passport strategies
require("./config/passportGoogle")(passport);
require("./config/passportGithub")(passport);

// Import middleware (ensureAuth / ensureGuest)
const { ensureAuth, ensureGuest } = require("./middleware/authMiddleware");

// Routes
app.use("/auth", require("./routes/auth"));       // auth routes (login, google, github, logout, dashboard)
app.use("/tasks", require("./routes/tasks")); // CRUD routes for tasks (protected by ensureAuth inside routes)

// Home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});


// 404 handler
app.use((req, res) => {
  res.status(404).render("error", {
    message: "Page not found",
    error: {},
    title: "Error"
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    message: err.message,
    error: err,
    title: 'Error'
  });
});

// Export the app only
module.exports = app;
