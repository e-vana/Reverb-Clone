//Setup imports
const express = require('express');
const router = express.Router();
const Purchase = require("../models/purchase");


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

// Get all purchases
router.get('/', catchErrors(async (req, res) => {
  var purchases = await Purchase.find();
  if(purchases){
    res.send(purchases);
  } else {
    throw { message: "No purchases found."}
  }
}));


// Get purchases for a particular product
router.get('/:id', catchErrors(async (req, res) => {
  var purchase = await Purchase.find({ _id: req.params.id });
  if(purchase){
    res.send(purchase);
  } else {
    throw { message: "No purchase found."}
  }
}));

// Create a new purchase
router.post('/', catchErrors(async (req, res) => {
  var purchase = await Purchase.find({ _id: req.params.id });
  if(purchase){
    res.send(purchase);
  } else {
    throw { message: "No purchase found."}
  }
}));

module.exports = router;
