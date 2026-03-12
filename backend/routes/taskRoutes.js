// backend/routes/taskRoutes.js
const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Validation rules
const taskValidation = [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('description').optional().trim(),
    body('due_date').optional().isISO8601().toDate(),
    body('priority').optional().isInt({ min: 1, max: 5 }),
    body('estimated_minutes').optional().isInt({ min: 1 })
];

// All task routes require authentication
router.use(authMiddleware);

// Task routes
router.get('/', taskController.getTasks);
router.post('/', taskValidation, taskController.createTask);
router.get('/stats', taskController.getTaskStats);
router.get('/:id', taskController.getTask);
router.put('/:id', taskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;