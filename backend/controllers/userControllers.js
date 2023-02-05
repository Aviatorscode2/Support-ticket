// Description: This file contains all the functions that are used to handle the user routes
// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = (req, res) => {
    const {name, email, password} = (req.body);

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    res.send('Register Route')
 };

 // @desc Login a user
// @route POST /api/users/login
// @access Public

const loginUser = (req, res) => {
    res.send('Login Route');
 }

module.exports = {
    registerUser,
    loginUser
};