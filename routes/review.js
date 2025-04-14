
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { checkAuth } = require('../middleware/authMiddleware');

router.post('/', checkAuth, reviewController.leaveReview);
router.get('/dish/:dishId', reviewController.getReviewsForDish);
router.get('/chef/:chefId', reviewController.getReviewsForChef);
router.get('/average', reviewController.getAverageRating);

module.exports = router;
