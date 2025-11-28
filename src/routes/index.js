import express from 'express';
import productRoutes from './productRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';

const router = express.Router();

router.use('/api/products', productRoutes);
router.use('/api/categories', categoriesRoutes);


export default router