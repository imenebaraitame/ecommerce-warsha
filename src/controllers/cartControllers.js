import cart from "../data/mockcartData.js";
import products from "../data/mockproductData.js";

// get cart
export const getCart = (req, res) => {
  res.json(cart);
};

// add item to cart
export const addItemToCart = (req, res) => {
  const newItem = req.body;

  if (!newItem.productId || !newItem.quantity) {
    return res
      .status(400)
      .json({ message: "productId and quantity are required" });
  }

  const product = products.find((p) => p.id === newItem.productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingItem = cart.items.find(
    (item) => item.productId === newItem.productId
  );

  if (newItem.quantity > product.quantity) {
    return res.status(400).json({ message: "Insufficient product quantity" });
  }

  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    cart.items.push(newItem);
  }
  
  cart.totalPrice += product.price * newItem.quantity;

  res.status(201).json(cart);
};