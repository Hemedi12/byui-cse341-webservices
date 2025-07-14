const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact); // Fixed from createUser
router.put('/:id', contactsController.updateContact); // Fixed from updateUser
router.delete('/:id', contactsController.deleteContact); // Fixed from deleteUser

module.exports = router;