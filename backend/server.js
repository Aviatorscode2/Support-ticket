const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHanddler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;


// Connect to database
connectDB();
// Create Express server
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Ticket API' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHanddler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));