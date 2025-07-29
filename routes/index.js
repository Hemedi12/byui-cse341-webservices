const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use('/books', require('./books')); // Add books route

module.exports = router;