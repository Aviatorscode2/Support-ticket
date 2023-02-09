const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
        ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: [ 'Laptop', 'Desktop', 'Tablet', 'Phone', 'Other' ],
    },
    description: {
      type: String,
      required: [true, 'Please add a description of your issue'],
    },
    status: {
      type: String,
      enum: [ 'New', 'Open', 'Closed' ],
      default: 'New',
     
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
