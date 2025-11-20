const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// List all assignments/tasks
router.get('/list', taskController.listTasks);

// Add new assignment
router.get('/add', taskController.showCreateForm);
router.post('/add', taskController.createTask);

// Edit assignment
router.get('/edit/:id', taskController.showEditForm);
router.post('/edit/:id', taskController.editTask);

// Delete assignment
router.post('/delete/:id', taskController.deleteTask);

module.exports = router;