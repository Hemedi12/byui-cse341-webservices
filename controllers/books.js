const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
  try {
    const books = await mongodb.getDb().db().collection('books').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching books' });
  }
};

const getSingleBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(req.params.id);
    const book = await mongodb.getDb().db().collection('books').findOne({ _id: bookId });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error fetching book' });
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      publication_year: req.body.publication_year,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      language: req.body.language,
      isbn: req.body.isbn,
      rating: req.body.rating,
      movie_adaptation: req.body.movie_adaptation,
      series: req.body.series
    };

    const response = await mongodb.getDb().db().collection('books').insertOne(book);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating book' });
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      publication_year: req.body.publication_year,
      genre: req.body.genre,
      pages: req.body.pages,
      publisher: req.body.publisher,
      language: req.body.language,
      isbn: req.body.isbn,
      rating: req.body.rating,
      movie_adaptation: req.body.movie_adaptation,
      series: req.body.series
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error updating book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('books')
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting book' });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};