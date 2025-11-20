const TaskModel = require("../models/Task");

// List all tasks/assignments
exports.listTasks = (req, res) => {
    let tasks = TaskModel.getAllTasks();

    // ----- Searching -----
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        tasks = tasks.filter(t =>
            t.title.toLowerCase().includes(searchTerm) ||
            t.description.toLowerCase().includes(searchTerm)
        );
    }
    // ----- Sorting -----
    if (req.query.sort) {
        const sortBy = req.query.sort;
        tasks = tasks.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
            if (sortBy === "status") return a.status.localeCompare(b.status);
        });
    }

    res.render("tasks/list", {
        title: "Assignments",
        tasks: tasks  // <-- matches EJS
    });
};

// Show create task form
exports.showCreateForm = (req, res) => {
    res.render("tasks/add", { title: "Add Assignment" });
};

// Handle create task
exports.createTask = (req, res) => {
    TaskModel.addTask(req.body);
    res.redirect("/tasks/list"); // redirect to main list page
};

// Show edit task form
exports.showEditForm = (req, res) => {
    const task = TaskModel.getTaskById(req.params.id);
    if (!task) return res.status(404).send("Assignment not found");
    res.render("tasks/edit", { title: "Edit Assignment", task });
};

// Handle edit task
exports.editTask = (req, res) => {
    TaskModel.updateTask(req.params.id, req.body);
    res.redirect("/tasks/list"); // redirect to main list page
};

// Handle delete task
exports.deleteTask = (req, res) => {
    TaskModel.deleteTask(req.params.id);
    res.redirect("/tasks/list"); // redirect to main list page
};