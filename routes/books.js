const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validateBook');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/', validation.saveBook, booksController.createBook);
router.put('/:id', validation.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;