const Task = require("../models/Task");

// List all tasks
exports.listTasks = async (req, res) => {
    let tasks = await Task.find();

    // Searching
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        tasks = tasks.filter(t =>
            t.title.toLowerCase().includes(searchTerm) ||
            t.description.toLowerCase().includes(searchTerm)
        );
    }

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort;
        tasks = tasks.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
            if (sortBy === "status") return a.status.localeCompare(b.status);
        });
    }

    res.render("tasks/list", { title: "Assignments", tasks });
};

// Show create form
exports.showCreateForm = (req, res) => {
    res.render("tasks/add", { title: "Add Assignment" });
};

// Handle create task
exports.createTask = async (req, res) => {
    await Task.create(req.body);
    res.redirect("/tasks/list");
};

// Show edit form
exports.showEditForm = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Assignment not found");
    res.render("tasks/edit", { title: "Edit Assignment", task });
};

// Handle edit task
exports.editTask = async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/tasks/list");
};

// Handle delete task
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks/list");
};