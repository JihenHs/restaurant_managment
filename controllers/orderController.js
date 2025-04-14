const Dish = require('../models/Dish');
const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('../sendEmail'); 


exports.listAvailableDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { dishId, quantity, deliveryAddress, paymentMethod } = req.body;

    if (!deliveryAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Adresse de livraison et méthode de paiement sont requis' });
    }

    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Plat introuvable" });
    }

    const newOrder = new Order({
      customer: req.user.id,
      dishes: [{ dishId, quantity }],
      deliveryAddress,
      paymentMethod,
      status: 'en attente'
    });

    await newOrder.save();

   
    const populatedOrder = await newOrder.populate('customer', 'email');
    if (populatedOrder.customer?.email) {
      await sendEmail(
        populatedOrder.customer.email,
        'Confirmation de réception de votre commande',
        `Votre commande est bien reçu. ID de commande : ${newOrder._id}`
      );
    }

    res.status(201).json({ message: 'Commande passée avec succès', order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur commande', error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate('dishes.dishId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error });
  }
};


exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Vous ne pouvez annuler que vos propres commandes" });
    }

    order.status = 'annulée';
    await order.save();

    res.json({ message: 'Commande annulée avec succès', order });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'cuisinier') {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    const orders = await Order.find().populate('customer', 'email').populate('dishes.dishId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'cuisinier') {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    const { status } = req.body;
    const validStatuses = ['préparation', 'en cours de livraison', 'livré'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Statut invalide. Utilisez 'préparation', 'en cours de livraison' ou 'livré'." });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande introuvable' });

    order.status = status;
    await order.save();

    await order.populate('customer', 'email');

    if (order.customer?.email) {
      await sendEmail(
        order.customer.email,
        'Mise à jour de votre commande',
        `Le statut de votre commande (ID: ${order._id}) a été mis à jour : ${status}`
      );
    }

    res.json({ message: 'Statut mis à jour', order });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
