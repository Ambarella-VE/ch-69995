// server/routes/index.routes.js
import express from 'express';
import productRoutes from './products.routes.js';
import userRoutes from './auth.routes.js'; 
import cartRoutes from './cart.routes.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);

export default router;
