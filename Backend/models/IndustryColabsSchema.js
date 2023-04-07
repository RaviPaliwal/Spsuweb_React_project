const mongoose = require('mongoose');

const IndustryCollaborationSchema = new mongoose.Schema({
  title: {
    unique:true,
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    extention: String,
    path: String,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const IndustryCollaboration = mongoose.model('IndustryCollaboration', IndustryCollaborationSchema);

module.exports = IndustryCollaboration;
