import Cart from "../models/cart.js";
import Product from "../models/product.js";



// get cart
export const getCartById = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('items.product');
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            error.message = "Cart not found";
            throw error;
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// add item to cart
export const addItemToCart = async(req, res) => {
  try {
    const newItem = req.body;
    if (!newItem.productId || !newItem.quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity are required" });
    }
  
    const product = Product.find((p) => p.id === newItem.productId);
  
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    const existingItem = await Cart.items.find(
      (item) => item.productId === newItem.productId
    );

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      Cart.items.push(newItem);
    }
  
    if (newItem.quantity > product.quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }
    
    Cart.totalPrice += product.price * newItem.quantity;
    res.status(201).json(Cart);
    
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};