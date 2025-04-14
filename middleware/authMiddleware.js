const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.checkAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  console.log('Received token:', token); 

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
   
    const tokenWithoutBearer = token.split(' ')[1];
    console.log('Token without Bearer prefix:', tokenWithoutBearer); 

    
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); 

    
    req.user = await User.findById(decoded.id).select('-password');
    console.log('Found user:', req.user); 

    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Token invalide', error: error.message });
  }
};
