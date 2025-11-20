// models/Task.js
let tasks = [];
let nextId = 1;

class Task {
    constructor(title, description, dueDate, status) {
        this._id = nextId++; // unique ID
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status || "Not Started"; // default status
    }
}

// Get all tasks
function getAllTasks() {
    return tasks;
}

// Get a single task by _id
function getTaskById(id) {
    return tasks.find(t => t._id == id);
}

// Add a new task
function addTask(taskData) {
    const newTask = new Task(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.status
    );
    tasks.push(newTask);
}

// Update an existing task
function updateTask(id, updatedData) {
    const task = getTaskById(id);
    if (task) {
        task.title = updatedData.title;
        task.description = updatedData.description;
        task.dueDate = updatedData.dueDate;
        task.status = updatedData.status;
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t._id != id);
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask };