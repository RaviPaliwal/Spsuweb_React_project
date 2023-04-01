const { Schema, mongoose } = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Faculty = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  post: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    require: true,
  },
  title:{
    type:String,
    default:Date.now,

  },
  sociallinks: [{
    linkedin: String,
    instagram:String,
    gmail:String,
    vidvan:String,
  }],

  image: {
    data: Buffer,
    extention: String,
    path: String,
    contentType: String,
  },
  timestamp: {
    type: Date
  },
});

Faculty.plugin(paginate);
module.exports = mongoose.model("facultydata", Faculty);
