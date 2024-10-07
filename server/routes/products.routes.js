// server/routes/product.routes.js
import express from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Rutas protegidas
router.post('/', authorize('admin'), createProduct);
router.put('/:id', authorize('admin'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

export default router;