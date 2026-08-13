import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const useAddToCart = () => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [notification, setNotification] = useState("");

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setNotification("Please login to add items to cart");

      setTimeout(() => {
        setNotification("");
      }, 3000);

      return {
        success: false,
        error: "Please login to add items to cart",
      };
    }

    const result = await addToCart(productId, 1);

    if (result.success) {
      setNotification("Added to cart!");
    } else {
      setNotification(result.error || "Failed to add to cart");
    }

    setTimeout(() => {
      setNotification("");
    }, 3000);

    return result;
  };

  return {
    handleAddToCart,
    notification,
  };
};

export default useAddToCart;