// server/routes/products.routes.js
import express from 'express';
import isAuth from '../middleware/auth.middleware.js';
import Product from '../models/product.model.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', isAuth, async (req, res) => {
  try {
    const products = await Product.find();
    const welcomeMessage = `Bienvenid@ ${req.user.email}!`;
    res.json({ message: welcomeMessage, response: products });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err.message });
  }
});

// Agregar un nuevo producto
router.post('/', isAuth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', response: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// Agregar varios productos
// Agregar varios productos
router.post('/bulk', isAuth, async (req, res) => {
  try {
    const products = req.body.products;
    console.log('Received Products:', products);

    // Verificar códigos duplicados
    const existingProducts = await Product.find({ code: { $in: products.map(p => p.code) } });
    console.log('Existing Products:', existingProducts);

    const existingCodes = new Set(existingProducts.map(p => p.code));
    console.log('Existing Codes:', [...existingCodes]);

    const newProducts = products.filter(p => !existingCodes.has(p.code));
    console.log('New Products to Add:', newProducts);

    if (newProducts.length === 0) {
      return res.status(400).json({ message: 'All products already exist' });
    }

    const result = await Product.insertMany(newProducts);
    res.status(201).json({ message: 'Products added successfully', response: result });
  } catch (err) {
    res.status(500).json({ message: 'Error adding products', error: err.message });
  }
});


// Actualizar un producto por ID
router.put('/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', response: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// Eliminar un producto por ID
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', response: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

export default router;
