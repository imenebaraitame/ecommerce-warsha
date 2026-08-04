import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
      setProduct(response.data);
    } catch (err) {
      setError('Failed to load product details.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setNotification('Please login to add items to cart');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setNotification('Added to cart successfully!');
      setTimeout(() => {
        setNotification('');
        navigate('/cart');
      }, 2000);
    } else {
      setNotification(result.error || 'Failed to add to cart');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4 text-xl">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl text-white mb-4">{error || 'Product not found'}</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-purple-300 hover:text-purple-400 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fadeIn">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl h-96 lg:h-full flex items-center justify-center shadow-2xl">
              <div className="text-9xl">📦</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/30">
              {/* Category Badge */}
              <span className="inline-block bg-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                <p className="text-purple-200 leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">Availability:</span>
                  <span className={`font-semibold ${product.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.quantity > 0 && (
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-300 text-xl font-bold"
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-white w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="w-12 h-12 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-300 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  product.quantity > 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-pink-500/50 hover:scale-105'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
                <div className="space-y-2 text-purple-200">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="text-white font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stock:</span>
                    <span className="text-white font-medium">{product.quantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Product ID:</span>
                    <span className="text-white font-mono text-sm">{product._id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
