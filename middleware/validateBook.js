const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string|min:3',
    author: 'required|string|min:3',
    publication_year: 'required|integer|min:1000|max:2025',
    genre: 'required|array',
    pages: 'required|integer|min:1',
    publisher: 'required|string',
    language: 'required|string',
    isbn: 'string',
    rating: 'numeric|min:0|max:5',
    movie_adaptation: 'boolean',
    series: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err
      });
    } else {
      next();
    }
  });
};

module.exports = { saveBook };