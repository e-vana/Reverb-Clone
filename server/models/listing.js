let mongoose = require('mongoose');

let listingSchema = mongoose.Schema({
  user: {
    type: String,
    required: false
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
  used: {
    type: Boolean,
    required: false,
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
  category: {
    type: Array,
    required: true
  },
  images: {
    type: Array,
    required: false,
    default: ["https://picsum.photos/500",
    "https://picsum.photos/200"]
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
  },
  sold: {
    type: Boolean,
    required: true,
    default: false
  }
  // user: {
  //   type: String,
  //   required: false
  // },
  // dateAdded: {
  //   type: Date,
  //   required: true
  // },
  // listingUrl: {
  //   type: String,
  //   required: false
  // },
  // brand: {
  //   type: String,
  //   required: true
  // },
  // model: {
  //   type: String,
  //   required: true
  // },
  // //Brand New, Mint, Excellent, Good, Fair, Poor, Broken
  // condition: {
  //   type: String,
  //   required: true
  // },
  // used: {
  //   type: Boolean,
  //   required: false,
  // },
  // year: {
  //   type: Number,
  //   required: true
  // },
  // color: {
  //   type: String,
  //   required: false
  // },
  // listingTitle: {
  //   type: String,
  //   required: true
  // },
  // price: {
  //   type: Number,
  //   required: true
  // },
  // shippingPrice: {
  //   type: Number,
  //   required: true
  // },
  // description: {
  //   type: String,
  //   required: true
  // },
  // shippingAvailable: {
  //   type: Boolean,
  //   required: false
  // },
  // localPickupAvailable: {
  //   type: Boolean,
  //   required: false
  // },
  // manufacturedIn: {
  //   type: String,
  //   required: false
  // },
  // category: {
  //   type: Array,
  //   required: true
  // },
  // images: {
  //   type: Array,
  //   required: false
  // },
  // videoLink: {
  //   type: String,
  //   required: false
  // },
  // soundLink: {
  //   type: String,
  //   required: false
  // },
  // featured: {
  //   type: Boolean,
  //   required: false,
  //   default: false
  // },
  // clicks: {
  //   type: Number,
  //   required: false,
  //   default: 0
  // },
  // sold: {
  //   type: Boolean,
  //   required: true,
  //   default: false
  // }
})





let Listing = module.exports = mongoose.model('Listing', listingSchema);