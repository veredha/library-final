const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    copies: { type: Number, required: true },
    category: String,
    imagePath: String
    
});

module.exports = mongoose.model('Book', bookSchema);
