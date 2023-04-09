const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    data:Buffer,
    path:String,
    extention: String,
    contentType: String // specify image MIME type

  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;