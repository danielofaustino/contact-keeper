const express = require('express');

const router = express.Router();

// @route   GET  api/contacts
// @desc    Get all users Contacts
// @access  Private

router.get('/', (req, res) => {
  res.send('Get all contacts');
});


// @route   POST  api/contacts
// @desc    Add new Contact
// @access  Private

router.post('/', (req, res) => {
  res.send('Add Contact');
});


// @route   PUT  api/contacts/:id
// @desc    Update Contact
// @access  Private

router.put('/', (req, res) => {
  res.send('Update Contact');
});


// @route   Delete  api/contacts/:id
// @desc    Delete Contact
// @access  Private

router.delete('/', (req, res) => {
  res.send('Delete Contact');
});
module.exports = router;