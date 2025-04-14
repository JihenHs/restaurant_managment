
const Review = require('../models/Review');
exports.leaveReview = async (req, res) => {
    try {
      const userId = req.user._id; 
      const { rating, comment, dishId, chefId } = req.body;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Note invalide. Elle doit être entre 1 et 5.' });
      }
  
      if (!dishId && !chefId) {
        return res.status(400).json({ message: 'Vous devez cibler un plat ou un cuisinier.' });
      }
  
      const existingReview = await Review.findOne({
        user: userId,
        dish: dishId || null,
        chef: chefId || null
      });
  
      if (existingReview) {
        return res.status(400).json({ message: 'Vous avez déjà laissé un avis.' });
      }
  
      const newReview = new Review({
        user: userId,
        rating,
        comment,
        dish: dishId || null,
        chef: chefId || null
      });
  
      await newReview.save();
  
      res.status(201).json({ message: 'Avis enregistré avec succès.', review: newReview });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  };
  

exports.getReviewsForDish = async (req, res) => {
    const { dishId } = req.params;
    const reviews = await Review.find({ dish: dishId }).populate('user', 'name');
    res.json(reviews);
  };
  
  exports.getReviewsForChef = async (req, res) => {
    const { chefId } = req.params;
    const reviews = await Review.find({ chef: chefId }).populate('user', 'name');
    res.json(reviews);
  };
  
  exports.getAverageRating = async (req, res) => {
    const { dishId, chefId } = req.query;
  
    const match = {};
    if (dishId) match.dish = dishId;
    if (chefId) match.chef = chefId;
  
    const result = await Review.aggregate([
      { $match: match },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);
  
    res.json({ averageRating: result[0]?.averageRating || 0 });
  };
  
