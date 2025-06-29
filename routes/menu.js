const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const { verifyToken } = require('../middleware/auth'); // Crearemos este middleware

// --- RUTA PÚBLICA ---
// GET /api/menu - Devuelve el menú en el formato que tu frontend espera
router.get('/menu', async (req, res) => {
  try {
    const dishes = await Dish.find();

    // Agrupamos los platos por categoría para mantener la estructura del JSON original
    const groupedMenu = dishes.reduce((acc, dish) => {
      const category = dish.category;
      const existingCategory = acc.find(cat => cat.category === category);

      const dishItem = {
          // Mongoose añade _id, pero si no lo quieres, puedes desestructurar aquí
          name: dish.name,
          description: dish.description,
          ingredients: dish.ingredients,
          allergens: dish.allergens,
          image: dish.image,
          price_ars: dish.price_ars,
          price_usd: dish.price_usd,
          _id: dish._id // Enviamos el ID para futuras operaciones de edición/borrado
      };

      if (existingCategory) {
        existingCategory.items.push(dishItem);
      } else {
        acc.push({ category: category, items: [dishItem] });
      }
      return acc;
    }, []);

    res.json(groupedMenu);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// --- RUTAS PROTEGIDAS (ADMIN) ---

// POST /api/dishes - Crear un nuevo plato
router.post('/dishes', verifyToken, async (req, res) => {
    // Lógica para crear un plato...
    const { name, description, ingredients, allergens, image, price_ars, price_usd, category } = req.body;
    const newDish = new Dish({ name, description, ingredients, allergens, image, price_ars, price_usd, category });
    try {
        const savedDish = await newDish.save();
        res.status(201).json(savedDish);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/dishes/:id - Actualizar un plato
router.put('/dishes/:id', verifyToken, async (req, res) => {
    // Lógica para actualizar un plato...
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDish) return res.status(404).json({ message: 'Plato no encontrado' });
        res.json(updatedDish);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/dishes/:id - Borrar un plato
router.delete('/dishes/:id', verifyToken, async (req, res) => {
    // Lógica para borrar un plato...
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        if (!deletedDish) return res.status(404).json({ message: 'Plato no encontrado' });
        res.json({ message: 'Plato eliminado correctamente' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;