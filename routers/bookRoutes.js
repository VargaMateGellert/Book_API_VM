const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');

bookRouter.get('/', bookController.getAllBooks);
bookRouter.get('/:id', bookController.getBookById);
bookRouter.post('/', bookController.createBook);
bookRouter.put('/:id', bookController.putBookById);
bookRouter.delete('/:id', bookController.deleteBookById);

module.exports = bookRouter;