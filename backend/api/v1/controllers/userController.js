const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
    GetAllUsers: (req, res) => {
        User.find()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    GetUserById: (req, res) => {
        const userId = req.params.id;
        User.findById(userId)
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    AddUser: (req, res) => {
        const body = req.body;
        const newUser = new User(body);
        newUser.save()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(400).json({ message: err.message });
            });
    },
    UpdateUser: (req, res) => {
        const userId = req.params.id;
        const body = req.body;
        User.findByIdAndUpdate(userId, body, { new: true })
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(400).json({ message: err.message });
            });
    },
    DeleteUserById: (req, res) => {
        const userId = req.params.id;
        User.findByIdAndDelete(userId)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    RegisterUser: (req, res) => {
        const { username, email, password } = req.body;
        User.findOne({ email })
            .then((existingUser) => {
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                bcrypt.hash(password, 10)
                    .then((hash) => {
                        const newUser = new User({
                            username,
                            email,
                            password: hash
                        });
                        newUser.save()
                            .then((data) => {
                                 // Log the user object
                                console.log('Registered user:', data);
                                // Create a session for the user
                                req.session.user = {
                                    _id: data._id, 
                                    email: data.email,
                                    username: data.username
                                };
                                return res.status(200).json({ message: 'User registered successfully', user: data });
                            })
                            .catch((err) => {
                                return res.status(500).json({ message: err.message });
                            });
                    });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    },
    
    LoginUser: (req, res) => {
        const { email, password } = req.body;
        console.log('Attempting to find user with email:', email);
        User.findOne({ email })
            .then((existingUser) => {
                if (!existingUser) {
                    return res.status(404).json({ message: 'User not found. Please register before logging in.' });
                }
                bcrypt.compare(password, existingUser.password)
                    .then((isValid) => {
                        if (!isValid) {
                            return res.status(401).json({ message: 'Invalid password' });
                        }
                        // Log the user object
                        console.log('Logged in user:', existingUser);
                        
                        // Create a session for the user
                        req.session.user = {
                            _id: existingUser._id, // Change userId to _id
                            email: existingUser.email,
                            fullname: existingUser.fullname
                        };
                        return res.status(200).json({ message: 'Login successful' });
                    });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
    }
}