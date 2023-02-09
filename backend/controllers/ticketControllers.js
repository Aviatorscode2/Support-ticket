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
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please select a product and add a description');
  }

  // get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

    // create ticket
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'New'
    });
  res.status(201).json(ticket);
});

module.exports = {
    getTickets,
    createTicket
};