const express = require('express');
const router = express.Router();
const { 
  createMessage,
  getAllManagerMessages,
  deleteMessage
} = require('../controllers/messages.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/requireAdmin.middleware');

router.post('/', authenticateToken, createMessage);
router.get('/', authenticateToken, requireAdmin, getAllManagerMessages);
router.delete('/:id', authenticateToken,requireAdmin, deleteMessage);

module.exports = router;