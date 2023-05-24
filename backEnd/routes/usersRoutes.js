const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/usersController');

// Affiche tous les users
router.get('/', userCtrl.getAllUsers);
// Affiche l'user id
router.get('/:id', userCtrl.userInfo);
// Supprime l'user id
router.delete('/:id', userCtrl.deleteUser);


module.exports = router;
