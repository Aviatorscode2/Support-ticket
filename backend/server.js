const express = require('express');
const dotenv = require('dotenv').config();
const {errorHanddler} = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;


// Create Express server
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Ticket API' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHanddler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));