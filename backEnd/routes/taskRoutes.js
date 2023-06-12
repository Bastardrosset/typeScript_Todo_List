const router = require('express').Router();
const taskController = require('../controllers/tasksController');
const auth = require('../middleware/auth.Middleware');


router.post('/create', auth, taskController.createTask);
router.get('/read', auth, taskController.readAllTasks);
router.get('/read/:id', auth, taskController.readTask);
router.put('/editStatus/:id', auth, taskController.updateStatusTask);
router.put('/editAdmin/:id', auth, taskController.editAdminTask);
router.delete('/delete/:id', auth, taskController.deleteTask);

module.exports = router;