const express = require('express');
const { checkAuth } = require('../middleware/authMiddleware');
const {
  getAllDishes,
  addDish,
  editDish,
  deleteDish
} = require('../controllers/dishController');

const router = express.Router();


const checkRole = (req, res, next) => {
  if (req.user.role !== 'cuisinier' && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Seuls les cuisiniers ou admins peuvent faire ça." });
  }
  next();
};

router.get('/all', getAllDishes);
router.post('/add', checkAuth, checkRole, addDish);
router.put('/edit/:id', checkAuth, checkRole, editDish);
router.delete('/delete/:id', checkAuth, checkRole, deleteDish);

module.exports = router;
