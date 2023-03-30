const { Schema, mongoose } = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Faculty = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  post: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    require: true,
  },
  contacts: {
    linkedin: String,
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

Faculty.plugin(paginate);
module.exports = mongoose.model("facultydata", Faculty);
