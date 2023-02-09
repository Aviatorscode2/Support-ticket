const express = require('express');
const router = express.Router();
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketControllers');
const { protect} = require('../middleware/authMiddleware');

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);

router.get('/:id', protect, getTicket);
router.put('/:id', protect, updateTicket);
router.delete('/:id', protect, deleteTicket);


module.exports = router;