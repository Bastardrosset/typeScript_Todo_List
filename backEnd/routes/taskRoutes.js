const router = require('express').Router();
const taskController = require('../controllers/tasksController');
const auth = require('../middleware/auth.Middleware');


router.post('/create', auth, taskController.createTask);
router.get('/read', auth, taskController.readAllTasks);
router.get('/read/:id', auth, taskController.readTask);
router.put('/edit/:id', auth, taskController.updateTask);
router.delete('/delete/:id', auth, taskController.deleteTask);

module.exports = router;