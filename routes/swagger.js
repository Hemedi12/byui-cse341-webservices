
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


// Add book routes to Swagger documentation
swaggerDocument.paths['/books'] = {
  get: {
    summary: 'Get all books',
    responses: {
      200: { description: 'Successful operation' }
    }
  },
  post: {
    summary: 'Create a new book',
    responses: {
      201: { description: 'Book created successfully' }
    }
  }
};

swaggerDocument.paths['/books/{id}'] = {
  get: {
    summary: 'Get a book by ID',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the book to fetch'
    }],
    responses: {
      200: { description: 'Successful operation' },
      404: { description: 'Book not found' }
    }
  },
  put: {
    summary: 'Update a book',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the book to update'
    }],
    responses: {
      204: { description: 'Book updated successfully' },
      404: { description: 'Book not found' }
    }
  },
  delete: {
    summary: 'Delete a book',
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the book to delete'
    }],
    responses: {
      204: { description: 'Book deleted successfully' },
      404: { description: 'Book not found' }
    }
  }
};






router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;