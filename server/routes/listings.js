//Setup imports
const express = require('express');
const router = express.Router();
const Listing = require("../models/listing");
const tokenBlacklist = require("../models/tokenBlacklist");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

//Util Functions
const catchErrors = require("../util/catchErrors");
const isAdmin = require("../util/isAdmin");
const checkToken = require("../util/checkToken");

//CORS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.get('/', catchErrors(async (req, res) => {
  var listings = await Listing.find();
  if(listings){
    res.send(listings);
  } else {
    throw { message: "No listings found."}
  }
}));


router.get('/featured-listings', catchErrors(async (req, res) => {
  var listing = await Listing.find({featured: true})
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No featured listings found."}
  }
}));

router.get('/new-listings', catchErrors(async (req, res) => {
  var listing = await Listing.find({}, {}, { sort: { 'dateAdded' : -1 } })
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No new listings found."}
  }
}));

router.get('/:id', catchErrors(async (req, res) => {
  var listing = await Listing.find({ _id: req.params.id });
  if(listing){
    res.send(listing);
  } else {
    throw { message: "No listing found."}
  }
}));

// router.post('/', catchErrors(async (req, res) => {
//   var doesExist = await Product.findOne({itemName: req.body.itemName});
//   if(doesExist){
//     throw { message: "A product with this name already exists."}
//   }


//   const newProduct = new Product({
//     itemName: req.body.itemName,
//     itemPrice: req.body.itemPrice,
//     itemPictureUrl: req.body.itemPictureUrl,
//     itemPictureUrlLarge: req.body.itemPictureUrlLarge,
//     itemDescription: req.body.itemDescription,
//     featured: req.body.featured,
//     dateAdded: Date.now()
//   });

//   var save = await newProduct.save();
//   if(save){
//     res.send(save);
//   }else {
//     throw { message: "Error saving new product."}
//   }
// }))
module.exports = router;
