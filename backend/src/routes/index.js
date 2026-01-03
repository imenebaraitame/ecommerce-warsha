import express from 'express';
import productRoutes from './productRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';
import cartRoutes from './cartRoutes.js';

const router = express.Router();

router.use('/api/products', productRoutes);
router.use('/api/categories', categoriesRoutes);
router.use('/api/cart', cartRoutes);


export default router