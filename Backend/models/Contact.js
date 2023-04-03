const mongoose = require('mongoose');

const contactReqSchema = new mongoose.Schema({
  name: {
    required:true,
    type: String,
    required: true
  },
  email: {
    required:true,
    type: String,
    required: true
  },
  phone: {
    required:true,
    type: String,
    required: true
  },
  message: {
    required:true,
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContactReq = mongoose.model('ContactReq', contactReqSchema);

module.exports = ContactReq;
