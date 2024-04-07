// auth.js

const authMiddleware = (req, res, next) => {
    // Check if user is logged in (i.e., if session exists)
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    // User is authenticated, proceed to the next middleware
    next();
};

module.exports = { authMiddleware };
