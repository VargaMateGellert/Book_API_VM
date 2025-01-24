const authorModel = require('../models/authorModel');
const ErrorResponse = require('../utils/errorResponse');

createAuthor = async (req, res) => {
    try {
        const newAuthor = await authorModel.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
}

getAuthors = async (req, res, next) => {
    try {
        let query;
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        query = JSON.parse(queryStr);

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        const skip = (page - 1) * limit;

        let authorQuery = authorModel.find(query);

        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            authorQuery = authorQuery.select(fields);
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            authorQuery = authorQuery.sort(sortBy);
        } else {
            authorQuery = authorQuery.sort('title');
        }

        authorQuery = authorQuery.skip(skip).limit(limit);
        const authors = await authorQuery;
        const total = await authorModel.countDocuments(query);

        res.json({
            count: authors.length,
            total,
            page,
            data: authors,
        });
    } catch (error) {
        next(error);
    }
}

getAuthorById = async (req, res, next) => {
    try {
        const author = await authorModel.findById(req.params.id);
        if(author){
            res.status(200).json(author)
        }else{
            res.status(404).send()
        }
    } catch (error) {
        next(new ErrorResponse('Id not found', 404));
    }
}

deleteAuthorById = async (req, res, next) => {
    try {
        const author = await authorModel.findByIdAndDelete(req.params.id,);
        if (author) {
            res.status(200).json(author)          
        }else{
            res.status(500)
        }
    } catch (error) {
        next(error)
    }
}

putAuthorById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const author = await authorModel.findByIdAndUpdate(id, updatedData, options);
        if (author) {
            return res.status(200).json(author);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorById,
    putAuthorById,
    deleteAuthorById}