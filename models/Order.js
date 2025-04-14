const orderController = require('../controllers/orderController');

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dishes: [
    {
      dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['en attente', 'préparation', 'en cours de livraison', 'livré'],
    default: 'en attente' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
