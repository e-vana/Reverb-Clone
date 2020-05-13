//Setup imports
const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const Category = require("../models/category");

const tokenBlacklist = require("../models/tokenBlacklist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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

//@@@@@@@@@@@@@@@@@@@@@@@@ GENERIC LISTING OPERATIONS @@@@@@@@@@@@@@@@@@@@@@@@
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
router.get('/:id', catchErrors(async (req, res) => {
  var listing = await Listing.find({ _id: req.params.id });
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No listing found."}
  }
}));

//@@@@@@@@@@@@@@@@@@@@@@@@ CATEGORY LISTINGS @@@@@@@@@@@@@@@@@@@@@@@@
// Get all listings from a category
// Sorting and Params logic
router.get('/c/:category', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var queryParams = [];
  var sortParams = {};
  var startAt = parseInt(req.query.start);
  var howMany = parseInt(req.query.num);


  if(req.query.used){
    queryParams.push({ used: true})
  }

  if(req.query.new){
    queryParams.push({ used: false})
  }

  if(req.query.lh){
    sortParams.price = +1;
  }
  if(req.query.hl){
    sortParams.price = -1;
  }
  if(req.query.recent){
    sortParams.dateAdded = -1;
  }


  //If there are no query parameters
  if(queryParams.length == 0){
    // var listings = await Listing.find({category: catStr}, null, sortParams);
    var listings = await Listing.find({category: catStr}, null, {sort: sortParams}).skip(startAt).limit(howMany);
    if(!listings){
      throw {message: "There were no results found with your query parameters."}
    }
    return res.send(listings);
  }
  //If there are query parameters, AND them into the query
  if(queryParams.length > 0){
    queryParams.push({category: catStr})

    var listings = await Listing.find({$and: queryParams}, null, {sort: sortParams}).skip(startAt).limit(howMany)

    if(!listings){
      throw {message: "There were no results found with your query parameters."}
    }
    return res.send(listings);
  }

}))


// Get number of listings in a category
router.get('/c/:category/number-of', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var listings = await Listing.find({ category: catStr});
  if(listings){
    res.send({"listingCount" : listings.length})
  } else {
    throw { message: "No listings found with this category tag."}
  }
}))



// Get Popular Listings from a category 
router.get('/c/:category/popular', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var listings = await Listing.find({ category: catStr}).sort({clicks: -1}).limit(10);

  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found with this category tag."}
  }
}))

// Get New Listings from a category 
router.get('/c/:category/new', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var listings = await Listing.find({ $and: [{category: catStr}, {used: false}]}).sort({dateAdded: -1}).limit(10);

  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found with this category tag."}
  }
}))

// Get RECENT listings from a category
router.get('/c/:category/recent', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var listings = await Listing.find({ $and: [{category: catStr}]}).sort({dateAdded: -1}).limit(10);

  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found with this category tag."}
  }
}))

// Get Used Listings from a category 
router.get('/c/:category/used', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var listings = await Listing.find({ $and: [{category: catStr}, {used: true}]}).sort({dateAdded: -1}).limit(10);


  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found with this category tag."}
  }
}))




//@@@@@@@@@@@@@@@@@@@@@@@@ GENERATE LISTINGS @@@@@@@@@@@@@@@@@@@@@@@@
// Generates a random listing
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

router.post('/', catchErrors(async (req, res) => {
  var payload = {
    dateAdded: Date.now(),
    brand: req.body.brand,
    model: req.body.model,
    condition: req.body.condition,
    used: req.body.used,
    listingTitle: req.body.listingTitle,
    price: req.body.price,
    shippingPrice: req.body.shippingPrice,
    description: req.body.description,
    category: req.body.category,
  }
  var newListing = new Listing(payload);
  var saveListing = await newListing.save();
  if(saveListing){
    res.send(saveListing)
  }else {
    throw { message: "Failed to save new item."}
    
  }
}))

// end points for /items
// get('/')
// get('/:id')
// get('/popular')

// where
// get('/new')
// should be
// get('/?sort=new')

module.exports = router;
