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


//@@@@@@@@@@@@@@@@@@@@@@@@ CATEGORY URLS @@@@@@@@@@@@@@@@@@@@@@@@
// Get Category URL for banner image
router.get('/:category/header-url', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var category = await Category.findOne({ name: catStr});
  if(category){
    res.send({ "url" : category.url})

  } else {
    throw { message: "No category banner URL found for this category."}
  }
}))

// Set a new Category URL for banner image
router.post('/:category/header-url', catchErrors(async (req, res) => {
  var catStr;
  if(req.params.category.includes("-")){
    var cat = req.params.category.split("-");
    catStr = cat.join(" ");
  } else {
    catStr = req.params.category;
  }

  var category = new Category(
    {
      name: catStr,
      url: req.body.categoryUrl
    }
  );
   var saveCategory = await category.save();
   if(saveCategory){
     res.send(saveCategory)
   } else {
     throw { message: "There was a failure setting a new category URL."}
   }

}))

module.exports = router;
