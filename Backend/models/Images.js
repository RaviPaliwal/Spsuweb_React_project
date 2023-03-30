const { Schema, mongoose } = require("mongoose");
const Image_schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  image: {
    extention: String,
    data: Buffer,
    contentType: String,
  },
});
module.exports = mongoose.model("images", Image_schema);
