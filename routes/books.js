const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validateBook');
const auth = require('../middleware/auth'); // Import the auth middleware

// Public routes (no authentication needed)
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);

// Protected routes (authentication required)
router.post('/', auth.authenticate, validation.saveBook, booksController.createBook);
router.put('/:id', auth.authenticate, validation.saveBook, booksController.updateBook);
router.delete('/:id', auth.authenticate, booksController.deleteBook);

module.exports = router;