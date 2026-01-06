import Cart from "../models/cart.js";
import Product from "../models/product.js";

// Get user's cart (or create if doesn't exist)
export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id; // From authenticationToken middleware
        
        let cart = await Cart.findOne({ userId }).populate('items.product');
        
        if (!cart) {
            // Create cart if doesn't exist
            cart = new Cart({ userId, items: [], total: 0 });
            await cart.save();
        }
        
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// Add item to cart
export const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user.id; // From authenticationToken middleware
        const { productId, quantity } = req.body;

        // Validation
        if (!productId || !quantity) {
            const error = new Error("Product ID and quantity are required");
            error.status = 400;
            return next(error);
        }

        if (quantity < 1) {
            const error = new Error("Quantity must be at least 1");
            error.status = 400;
            return next(error);
        }

        // Check if product exists and has sufficient stock
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            return next(error);
        }

        // Stock validation
        if (product.stock < quantity) {
            const error = new Error(`Insufficient stock. Only ${product.stock} items available.`);
            error.status = 400;
            return next(error);
        }

        // Find user's cart (or create if doesn't exist)
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        // Check if item already exists in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Check total quantity doesn't exceed stock
            const newQuantity = cart.items[itemIndex].quantity + quantity;
            if (newQuantity > product.stock) {
                const error = new Error(`Cannot add ${quantity} more. Only ${product.stock - cart.items[itemIndex].quantity} available.`);
                error.status = 400;
                return next(error);
            }
            
            // Update existing item quantity
            cart.items[itemIndex].quantity = newQuantity;
        } else {
            // Add new item to cart with current product price
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        // Recalculate total
        cart.total = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );

        await cart.save();

        // Populate product details before sending response
        const populatedCart = await cart.populate('items.product');
        
        res.status(200).json(populatedCart);

    } catch (error) {
        next(error);
    }
};

// Update item quantity in cart
export const updateItemQuantity = async (req, res, next) => {
    try {
        const userId = req.user.id; // From authenticationToken middleware
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validation
        if (!quantity || quantity < 1) {
            const error = new Error("Quantity must be at least 1");
            error.status = 400;
            return next(error);
        }

        // Check product stock
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            return next(error);
        }

        if (quantity > product.stock) {
            const error = new Error(`Insufficient stock. Only ${product.stock} items available.`);
            error.status = 400;
            return next(error);
        }

        // Find user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            return next(error);
        }

        // Find item in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            const error = new Error("Product not found in cart");
            error.status = 404;
            return next(error);
        }

        // Update quantity
        cart.items[itemIndex].quantity = quantity;

        // Recalculate total
        cart.total = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );

        await cart.save();

        const populatedCart = await cart.populate('items.product');
        res.status(200).json(populatedCart);

    } catch (error) {
        next(error);
    }
};

// Delete item from cart
export const deleteItemFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id; // From authenticationToken middleware
        const { productId } = req.params;

        // Find user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            return next(error);
        }

        // Find item index
        const itemIndex = cart.items.findIndex(
            item => item.product.equals(productId)
        );

        if (itemIndex === -1) {
            const error = new Error("Product not found in cart");
            error.status = 404;
            return next(error);
        }

        // Remove item from cart
        cart.items.splice(itemIndex, 1);

        // Recalculate total
        cart.total = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );

        await cart.save();

        // Populate product details before sending response
        const populatedCart = await cart.populate('items.product');

        res.status(200).json(populatedCart);

    } catch (error) {
        next(error);
    }
};

// Clear all items from cart
export const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.id; // From authenticationToken middleware

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            return next(error);
        }

        cart.items = [];
        cart.total = 0;

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {
        next(error);
    }
};

export default {
    getCart,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart,
    clearCart
};