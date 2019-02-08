const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  publisher: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  ratedby: {
    type: Number,
    default: 0,
    required: true
  },
  reviews: {
    type: Number,
    default: 0,
    required: true
  },
  addedby: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Book = mongoose.model("book", BookSchema);
