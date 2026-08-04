import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { isAuthenticated } = useAuth();
  const [notification, setNotification] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="mb-4 text-3xl text-black">
            Please login to view your cart
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg px-8 py-3 font-semibold text-black transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-purple-500"></div>
          <p className="mt-4 text-xl text-black">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateQuantity(productId, newQuantity);
    if (!result.success) {
      setNotification(result.error);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      setNotification("Item removed from cart");
      setTimeout(() => setNotification(""), 3000);
    } else {
      setNotification(result.error);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      const result = await clearCart();
      if (result.success) {
        setNotification("Cart cleared");
        setTimeout(() => setNotification(""), 3000);
      } else {
        setNotification(result.error);
        setTimeout(() => setNotification(""), 3000);
      }
    }
  };

  const cartItems = cart?.items || [];
  const total = cart?.total || 0;

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Notification */}
      {notification && (
        <div className="animate-slideInRight fixed top-24 right-4 z-50 rounded-lg px-6 py-3 text-black shadow-2xl">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 bg-clip-text text-5xl font-bold text-transparent">
              Shopping Cart
            </h1>
            <p className="text-purple-600">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="font-medium text-red-400 transition-colors duration-300 hover:text-red-300"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="py-16 text-center">
            <h2 className="mb-4 text-3xl text-black">Your cart is empty</h2>
            <p className="mb-8 text-purple-700">
              Add some products to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="rounded-lg px-8 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-pink-500/50"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item, index) => (
                <div
                  key={item.product?._id || index}
                  className="animate-fadeInUp rounded-xl border border-purple-500/30 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    {/* Product Image */}
                    <div className="flex h-32 w-full flex-shrink-0 items-center justify-center rounded-lg sm:w-32">
                      <div className="text-5xl">
                        <p>product image</p>{" "}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-black">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="mb-3 text-sm text-purple-700">
                        {item.product?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="bg-clip-text text-2xl font-bold text-transparent">
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
                        className="text-red-400 transition-colors duration-300 hover:text-red-300"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      <div className="flex items-center space-x-3 rounded-lg bg-slate-700 p-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product?._id,
                              item.quantity - 1,
                            )
                          }
                          className="h-8 w-8 rounded font-bold text-white transition-colors duration-300 hover:bg-slate-600"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product?._id,
                              item.quantity + 1,
                            )
                          }
                          className="h-8 w-8 rounded font-bold text-white transition-colors duration-300 hover:bg-slate-600"
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
              <div className="sticky top-24 rounded-xl border border-purple-500/30 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-lg">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Order Summary
                </h2>

                <div className="mb-6 space-y-4">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-purple-500/30 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mb-4 w-full rounded-lg py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-pink-500/50">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-lg bg-slate-700 py-3 font-medium text-white transition-all duration-300 hover:bg-slate-600"
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
