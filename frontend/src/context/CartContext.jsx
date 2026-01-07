import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.CART, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.CART_ITEMS,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to add to cart'
      };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.CART_ITEM_BY_ID(productId),
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update quantity'
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        API_ENDPOINTS.CART_ITEM_BY_ID(productId),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove from cart'
      };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(API_ENDPOINTS.CART, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart({ items: [], total: 0 });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to clear cart'
      };
    }
  };

  const getCartItemsCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
