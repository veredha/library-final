const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'defaultSecret', // Provide a secret value or use a default one
    resave:false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_CONN }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        secure: false,
        httpOnly: true
    }
});


module.exports = sessionMiddleware;
