const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            bcrypt.compare(password, user.password)
                .then(isValidPassword => {
                    if (!isValidPassword) {
                        return res.status(401).json({ message: 'Invalid password' });
                    }

                    req.session.user = {
                        userId: user._id,
                        email: user.email,
                        fullname: user.fullname,
                    
                    };

                    // Log session ID and session data
                    console.log('Session ID:', req.sessionID);
                    console.log('Session Data:', req.session);

                    return res.status(200).json({ message: 'Login successful' });
                })
                .catch(error => {
                    return res.status(500).json({ message: error.message });
                });
        })
        .catch(error => {
            return res.status(500).json({ message: error.message });
        });
};

const logoutUser = (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    loginUser,
    logoutUser
};
