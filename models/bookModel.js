const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        authorID: { type: Number, required: true },
        genre: { type: [String], required: true },
        price: { type: Number, required: true },
        publishYear: { type: Date, required: true }
    }
);

module.exports = mongoose.model('Book', bookSchema, 'books');