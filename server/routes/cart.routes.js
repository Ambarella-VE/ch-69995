// server/routes/cart.routes.js
import express from 'express';
import authorize from '../middleware/auth.middleware.js';
import { addToCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Ruta para agregar productos al carrito
router.post('/:cid/product/:pid', authorize('user'), addToCart);

export default router;