const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Client
router.get('/dishes', checkAuth, orderController.listAvailableDishes);
router.post('/order', checkAuth, orderController.placeOrder);
router.get('/my', checkAuth, orderController.getMyOrders);
router.delete('/cancel/:id', checkAuth, orderController.cancelOrder);

// Admin / Cuisinier
router.get('/all', checkAuth, orderController.getAllOrders);
router.put('/update-status/:id', checkAuth, orderController.updateOrderStatus);

module.exports = router;