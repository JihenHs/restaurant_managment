const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');


app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' Connecté à MongoDB Atlas'))
  .catch(err => {
    console.error(' Erreur de connexion à MongoDB :', err.message);
    process.exit(1); 
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});


const dishRoutes = require('./routes/dish'); 

app.use('/api/dishes', dishRoutes);


const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);









const stripeRoutes = require('./routes/stripeRoutes');
app.use('/api/stripe', stripeRoutes);



const reviewRoutes = require('./routes/review');
app.use('/api/reviews', reviewRoutes);
