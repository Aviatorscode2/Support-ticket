const asyncHandler = require('express-async-handler');


const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc    Get note for a ticker
// @route   GET /api/tickets/:ticketId/notes
// @access  Private

const getNotes = asyncHandler(async (req, res) => {
  // get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // get tickets for the user
  const ticket = await Ticket.findById(req.params.ticketId);

  if(ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ticket: req.params.ticketId});

  res.status(200).json(notes);
});




module.exports = {
    getNotes,
};