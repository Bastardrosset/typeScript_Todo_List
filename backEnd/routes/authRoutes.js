const express = require('express');

const router = express.Router();

const authCtrl = require('../controllers/authController');


// Route création de compte
router.post('/register', authCtrl.signUp);
// Route identification
router.post('/login', authCtrl.signIn);
// Route déconnection
router.get('/logout', authCtrl.logout);


module.exports = router;