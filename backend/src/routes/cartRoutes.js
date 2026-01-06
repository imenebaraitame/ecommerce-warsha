import express from 'express';
import { 
    getCart,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart,
    clearCart} from '../controllers/cartControllers.js';
import authenticationToken from '../middlewares/auth.js';


const router = express.Router();

// Get user's cart (authenticated)
router.get('/', authenticationToken, getCart);// localhost:5000/api/carts/ 

// Add item to cart (authenticated)
router.post('/items', authenticationToken, addItemToCart);// localhost:5000/api/carts/items  

// Update item quantity (authenticated)
router.put('/items/:productId', authenticationToken, updateItemQuantity);//localhost:5000/api/carts/items/:productId 

// Delete item from cart (authenticated)
router.delete('/items/:productId', authenticationToken, deleteItemFromCart);//localhost:5000//api/carts/items/:productId 

// Clear cart (authenticated)
router.delete('/', authenticationToken, clearCart);//localhost:5000//api/carts

export default router;