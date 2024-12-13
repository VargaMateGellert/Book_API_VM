const bookModel = require('../models/bookModel');

createBook = async (req, res) => {
    try {
        const newBook = await bookModel.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
}

getAllBooks = async (req, res, next) => {
    try {
        const books = await bookModel.find();
        res.json(books)
    } catch (error) {
        next(error)
    }
}

getBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).send()
        }
    } catch (error) {
        next(error)
    }
}

deleteBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id,);
        if (book) {
            res.status(200).json(book)          
        }else{
            res.status(500)
        }
    } catch (error) {
        next(error)
    }
}

putBookById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const book = await bookModel.findByIdAndUpdate(id, updatedData, options);
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { createBook, getAllBooks, getBookById, deleteBookById, putBookById };