const express = require('express');
const router = express.Router();
const { getTickets, createTicket, getTicket } = require('../controllers/ticketControllers');
const { protect} = require('../middleware/authMiddleware');

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);

router.get('/:id', protect, getTicket);


module.exports = router;