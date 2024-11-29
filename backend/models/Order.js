const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userDetails: {
    firstName: String,
    lastName: String,
    phoneNumber: String
  },
  orderNumber: {
    type: String,
    required: true
  },
  address: String,
  paymentMethod: String,
  cargoFee: Number,
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }],
  totalAmount: Number
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
