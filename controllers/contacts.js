const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createContact = async (req, res) => {
  const contact = { // Changed variable name to contact
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact); // Fixed collection name
    if (response.acknowledged) { // Correct success check
      res.status(201).json({ id: response.insertedId }); // 201 Created with ID
    } else {
      res.status(500).json('Failed to create contact');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = { // Fixed field names
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne( // Fixed collection
      { _id: contactId },
      contact
    );

    if (response.matchedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(200).send(); // Data unchanged
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId }); // Fixed collection
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact // Ensure this matches the function name above
};