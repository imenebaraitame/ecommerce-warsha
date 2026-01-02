import Cart from "../models/cart.js";
import Product from "../models/product.js";
import express from "express";
import errorMiddleware from "../middlewares/errorMiddleware.js";
const app = express();

// use error middleware
app.use(errorMiddleware);

// get cart
export const getCart = async(req, res) => {
 try {
    const cart = await Cart.find();
    res.json(cart);
 } catch (error) {
    res.status(500).json({ message: "Server Error" , error: error.message} );
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