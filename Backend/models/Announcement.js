const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = () => {
  let currentDate = new Date();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  return cMonth + "-" + cYear;
};

const Announcement_schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  info: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
    default: date,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("announcement", Announcement_schema);
