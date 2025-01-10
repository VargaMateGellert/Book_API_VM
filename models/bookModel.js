const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        authorId: { type: mongoose.SchemaTypes.ObjectId, required: true },
        genre: { type: [String], required: true },
        price: { type: Number, required: true },
        publishYear: { type: Date, required: true }
    }
);

module.exports = mongoose.model('Book', bookSchema, 'books');