const express = require('express');
const router = express.Router();
const { login, register, getCurrentUser, logout} = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/login', login);
router.post('/register', register);
router.get('/currentUser', authenticateToken, getCurrentUser);
router.post('/logout' ,authenticateToken,logout);
module.exports = router;
