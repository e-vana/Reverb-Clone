//Setup imports
const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const tokenBlacklist = require("../models/tokenBlacklist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const faker = require('faker');

//Util Functions
const catchErrors = require("../util/catchErrors");
const isAdmin = require("../util/isAdmin");
const checkToken = require("../util/checkToken");
const randomListing = require("../util/fakeListingGenerator")

//CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Get all listings 
router.get('/', catchErrors(async (req, res) => {
  var listings = await Listing.find();
  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found."}
  }
}));

// Get all listings with feature == true
router.get('/featured-listings', catchErrors(async (req, res) => {
  var listing = await Listing.find({featured: true})
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No featured listings found."}
  }
}));

// Get all of the most recent listings
router.get('/new-listings', catchErrors(async (req, res) => {
  var listing = await Listing.find({}, {}, { sort: { 'dateAdded' : -1 } })
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No new listings found."}
  }
}));

// Get a certain listing by ID
// router.get('/:id', catchErrors(async (req, res) => {
//   var listing = await Listing.find({ _id: req.params.id });
//   if(listing){
//     res.send(listing);
//   } else {
//     throw { message: "No listing found."}
//   }
// }));

// Get all listings from a category
// router.get('/c/:category', catchErrors(async (req, res) => {
//   var listings = await Listing.find({ category: req.params.category});
//   if(listings){
//     res.send(listings);
//   } else {
//     throw { message: "No listings found with this category tag."}
//   }
// }))

router.post('/random', catchErrors(async (req, res) => {
  // var item = RandomListing.generateRandomListing();
  var item = randomListing.generateRandomListing();
  var newListing = new Listing(item);
  var saveNewListing = await newListing.save();

  if(saveNewListing){
    res.send(saveNewListing)
  } else {
    throw { message: "Failed to save new item."}
  }

}))

module.exports = router;
