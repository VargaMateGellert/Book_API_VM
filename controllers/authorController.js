const authorModel = require('../models/authorModel');

createAuthor = async (req, res) => {
    try {
        const newAuthor = await authorModel.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
}

getAllAuthors = async (req, res, next) => {
    try {
        const authors = await authorModel.find();
        res.json(authors)
    } catch (error) {
        next(error)
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
        next(error)
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
    getAllAuthors,
    getAuthorById,
    putAuthorById,
    deleteAuthorById}