const faker = require('faker');
const Listing = require("../models/listing");


const generateRandomListing = function(){
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var guitars = [
    {
      brand: "Fender",
      model: "Stratocaster"
    },
    {
      brand: "Fender",
      model: "Telecaster"
    },
    {
      brand: "Fender",
      model: "Jaguar"
    },
    {
      brand: "Fender",
      model: "Jazzmaster"
    },
    {
      brand: "Ibanez",
      model: "RG"
    },
    {
      brand: "Ibanez",
      model: "S"
    },
    {
      brand: "Ibanez",
      model: "RGD"
    },
    {
      brand: "Gibson",
      model: "Les Paul"
    },
    {
      brand: "Gibson",
      model: "SG"
    },
    {
      brand: "Ernie Ball",
      model: "Music Man"
    },
    {
      brand: "Epiphone",
      model: "SG"
    },
    {
      brand: "Epiphone",
      model: "Les Paul"
    },
  ];
  
  var conditionTypes = ["Brand New", "Mint", "Excellent", "Good", "Fair", "Poor", "Broken"];

  var guitar = guitars[getRandomInt(0, guitars.length)];
  guitar.dateAdded = Date.now();
  guitar.user = faker.random.uuid();
  guitar.used = true;
  guitar.condition = conditionTypes[getRandomInt(0, conditionTypes.length)];
  guitar.year = getRandomInt(1955, 2020);
  guitar.color = faker.commerce.color();
  guitar.listingTitle = `${guitar.brand} ${guitar.model} ${guitar.condition} Condition`;
  guitar.price = getRandomInt(100, 3500);
  guitar.shippingPrice = getRandomInt(35, 150);
  guitar.description = faker.lorem.paragraph();
  guitar.shippingAvailable = faker.random.boolean();
  guitar.localPickupAvailable = faker.random.boolean();
  guitar.manufacturedIn = faker.address.country();
  guitar.category = "electric guitars";
  guitar.images = ["https://picsum.photos/500", "https://picsum.photos/200"];
  guitar.soundLink = faker.internet.url();
  guitar.videoLink = faker.internet.url();
  guitar.featured = faker.random.boolean();
  guitar.clicks = getRandomInt(0, 10000);
  // guitar.clicks = 500;

  return(guitar);

}



// module.exports = generateRandomListing();
exports.generateRandomListing = generateRandomListing;