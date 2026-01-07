import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-black mb-4">Please login to view your cart</h2>
          <button
            onClick={() => navigate('/login')}
            className=" text-black px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen  pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="text-black mt-4 text-xl">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateQuantity(productId, newQuantity);
    if (!result.success) {
      setNotification(result.error);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      setNotification('Item removed from cart');
      setTimeout(() => setNotification(''), 3000);
    } else {
      setNotification(result.error);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const result = await clearCart();
      if (result.success) {
        setNotification('Cart cleared');
        setTimeout(() => setNotification(''), 3000);
      } else {
        setNotification(result.error);
        setTimeout(() => setNotification(''), 3000);
      }
    }
  };

  const cartItems = cart?.items || [];
  const total = cart?.total || 0;

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-4  text-black px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold  bg-clip-text text-transparent mb-2">
              Shopping Cart
            </h1>
            <p className="text-purple-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-400 hover:text-red-300 transition-colors duration-300 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            
            <h2 className="text-3xl text-black mb-4">Your cart is empty</h2>
            <p className="text-purple-700 mb-8">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className=" text-black px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-pink-500/50"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.product?._id || index}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-purple-500/30 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32  rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-5xl"><p>product image</p> </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-2">
                        {item.product?.name || 'Product'}
                      </h3>
                      <p className="text-purple-700 text-sm mb-3">
                        {item.product?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-purple-700">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.product?._id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      
                      <div className="flex items-center space-x-3 bg-slate-700 rounded-lg p-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.product?._id, item.quantity - 1)}
                          className="w-8 h-8 text-white rounded hover:bg-slate-600 transition-colors duration-300 font-bold"
                        >
                          −
                        </button>
                        <span className="text-white font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product?._id, item.quantity + 1)}
                          className="w-8 h-8 text-white rounded hover:bg-slate-600 transition-colors duration-300 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-purple-500/30 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-purple-500/30 pt-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span className=" bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full  text-black py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-pink-500/50 mb-4">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-600 transition-all duration-300 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
