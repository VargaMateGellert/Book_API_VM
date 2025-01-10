const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        nationality: { type: String, required: true },
        birthYear: { type: Date, required: true },
        deathYear: { type: Date },
    }
);

module.exports = mongoose.model('Author', authorSchema, 'authors');