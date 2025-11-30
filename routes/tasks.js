const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { ensureAuth } = require('../middleware/authMiddleware');

// List all assignments/tasks
router.get('/list', taskController.listTasks);

// Protected — only authenticated users
// Add new assignment
router.get('/add', ensureAuth, taskController.showCreateForm);
router.post('/add', ensureAuth, taskController.createTask);

// Edit assignment
router.get('/edit/:id', ensureAuth, taskController.showEditForm);
router.post('/edit/:id', ensureAuth, taskController.editTask);

// Delete assignment
router.post('/delete/:id', ensureAuth, taskController.deleteTask);

module.exports = router;