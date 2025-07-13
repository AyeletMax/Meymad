const express = require('express');
const { getAllUsers, getUserById, deleteUser, updateUser, toggleBlockUser } = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware'); 
const { requireAdmin } = require('../middleware/requireAdmin.middleware');

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, requireAdmin, deleteUser);
router.patch('/block/:id', authenticateToken, requireAdmin, toggleBlockUser);

module.exports = router;