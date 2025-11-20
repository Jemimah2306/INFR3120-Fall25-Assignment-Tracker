// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: String,
    status: { type: String, default: "Not Started" }
});

module.exports = mongoose.model("Task", taskSchema);