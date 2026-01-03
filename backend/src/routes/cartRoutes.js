import express from 'express';
import { getCart, addItemToCart } from '../controllers/cartControllers.js';

const router = express.Router();

router.get('/', getCart);// localhost:5000/api/cart/
router.post('/', addItemToCart);// localhost:5000/api/cart/

export default router;