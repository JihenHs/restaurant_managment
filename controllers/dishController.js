const Dish = require('../models/Dish');


exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('createdBy', 'email');
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


exports.addDish = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const existingDish = await Dish.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });
    if (existingDish) {
      return res.status(400).json({ message: "Ce plat existe déjà." });
    }

    const newDish = new Dish({
      name,
      description,
      price,
      category,
      imageUrl,
      createdBy: req.user.id
    });

    await newDish.save();
    res.status(201).json({ message: 'Plat ajouté avec succès', dish: newDish });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


exports.editDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Plat introuvable" });

    if (dish.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier ce plat" });
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Plat mis à jour avec succès', dish: updatedDish });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Plat introuvable" });

    if (dish.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer ce plat" });
    }

    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
