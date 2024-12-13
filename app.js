require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routers/bookRoutes');
const authorRoutes = require('./routers/authorRoutes');

mongoose.set('strictQuery', true);
const connString = process.env.DATABASE;
mongoose.connect(connString);
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('connected', () => console.log('Connected to database'));

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

app.listen(3000, () => console.log('Server started'));

module.exports = app;