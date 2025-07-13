const express = require('express');
const router = express.Router();
const { 
    getReservations, 
    createReservation,
    update,
} = require('../controllers/reservations.controller');
const { authenticateToken } = require('../middleware/auth.middleware'); 

router.get('/',  getReservations);
router.post('/', authenticateToken, createReservation);
router.patch('/:id',authenticateToken, update);

module.exports = router;