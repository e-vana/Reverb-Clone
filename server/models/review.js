let mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  forProduct: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  dateAdded: {
    type: Date,
    required: true
  }
})



let Review = module.exports = mongoose.model('Review', reviewSchema);