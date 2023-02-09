const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private

const getTickets = asyncHandler(async (req, res) => {

    // get user using the ID in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // get tickets for the user
    const tickets = await Ticket.find({user: user._id});
    res.status(200).json(tickets);
});

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private

const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'createTicket'});
});

module.exports = {
    getTickets,
    createTicket
};