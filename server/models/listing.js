let mongoose = require('mongoose');

let listingSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  //Brand New, Mint, Excellent, Good, Fair, Poor, Broken
  condition: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  listingTitle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shippingAvailable: {
    type: Boolean,
    required: true
  },
  localPickupAvailable: {
    type: Boolean,
    required: true
  },
  manufacturedIn: {
    type: String,
    required: false
  },
  category: {
    type: Array,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  videoLink: {
    type: String,
    required: false
  },
  soundLink: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    required: false,
    default: false
  },
  clicks: {
    type: Number,
    required: false,
    default: 0
  }
})



let Listing = module.exports = mongoose.model('Listing', listingSchema);