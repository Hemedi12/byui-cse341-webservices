const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth'); // Import the auth middleware

// Public routes (no authentication needed)
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

// Protected routes (authentication required)
router.post('/', auth.authenticate, validation.saveContact, contactsController.createContact);
router.put('/:id', auth.authenticate, validation.saveContact, contactsController.updateContact);
router.delete('/:id', auth.authenticate, contactsController.deleteContact);

module.exports = router;