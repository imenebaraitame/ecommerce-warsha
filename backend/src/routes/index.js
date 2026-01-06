import express from 'express';
import productRoutes from './productRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';
import cartRoutes from './cartRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/api/products', productRoutes);
router.use('/api/categories', categoriesRoutes);
router.use('/api/carts', cartRoutes);
router.use('/api/users', userRoutes); // http://localhost:5000/api/users/


export default router