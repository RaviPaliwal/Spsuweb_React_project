const { Schema, mongoose } = require("mongoose");
const Carousel = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  info: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    extention: String,
    path: String,
    contentType: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("carousel", Carousel);
