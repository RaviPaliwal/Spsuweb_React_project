const express = require('express');
const router = express.Router();
const ContactReq = require('../models/Contact');

// Route to add contact request
router.post('/addreq', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate form data
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill out all fields' });
    }
    
    const newReq = new ContactReq({ name, email, phone, message });
    await newReq.save();
    
    res.status(201).json({ success: true, message: 'Contact request added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to get all contact requests
router.get('/getrequests', async (req, res) => {
  try {
    const requests = await ContactReq.find().sort({ createdAt: -1 });
    if(requests){
      res.json(requests);
    }
    else{
      res.status(200).json({ success: true, message:"No requests"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
router.delete('/deleterequest/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRequest = await ContactReq.findByIdAndDelete(id);
    
    if (deletedRequest) {
      res.status(200).json({ success: true, message: 'Contact request deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Contact request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;
