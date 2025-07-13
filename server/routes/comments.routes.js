const express = require('express');
const { getAllComments, createComment, updateComment, removeComment, createReply } = require('../controllers/comments.controller');
const { authenticateToken } = require('../middleware/auth.middleware'); 
const router = express.Router();

router.get('/', getAllComments); 
router.post('/', authenticateToken, createComment);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, removeComment);
router.post('/:parentId/replies', authenticateToken, createReply);

module.exports = router;