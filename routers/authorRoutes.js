const express = require('express');
const authorRouter = express.Router();
const authorController = require('../controllers/authorController');

authorRouter.get('/', authorController.getAllAuthors);
authorRouter.get('/:id', authorController.getAuthorById);
authorRouter.post('/', authorController.createAuthor);
authorRouter.put('/:id', authorController.putAuthorById);
authorRouter.delete('/:id', authorController.deleteAuthorById);

module.exports = authorRouter;