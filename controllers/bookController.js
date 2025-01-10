const bookModel = require('../models/bookModel');

createBook = async (req, res, next) => {
    try {
        const newBook = await bookModel.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
}


const getBooks = async (req, res, next) => {
    try {
        let query;
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = JSON.parse(queryStr);

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        const skip = (page - 1) * limit;

        let bookQuery = bookModel.find(query);

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            bookQuery = bookQuery.select(fields);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            bookQuery = bookQuery.sort(sortBy);
        } else {
            bookQuery = bookQuery.sort('title');
        }

        bookQuery = bookQuery.skip(skip).limit(limit);
        const books = await bookQuery;
        const total = await bookModel.countDocuments(query);

        res.json({
            count: books.length,
            total,
            page,
            data: books,
        });
    } catch (error) {
        next(error);
    }
};



getBookById = async (req, res, next) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (book) {
            res.status(200).json(book)
        } else {
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
        } else {
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

module.exports = { createBook, getBooks, getBookById, deleteBookById, putBookById };