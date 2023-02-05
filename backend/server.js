const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;


// Create Express server
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Ticket API' });
});

// routes
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));