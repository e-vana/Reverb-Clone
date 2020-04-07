let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
  orderDate: {
    type: Date,
    required: true
  },
  orderItems: {
    type: Array,
    required: true
  },
  orderTotal: {
    type: Number,
    required: true
  },
  orderEmail: {
    type: String,
    required: true
  },
  orderPhoneNumber: {
    type: Number,
    required: true
  }

})



let Order = module.exports = mongoose.model('Order', orderSchema);