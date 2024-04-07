// models/user.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },

    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String }
    },
    

});

module.exports = mongoose.model('User', userSchema);