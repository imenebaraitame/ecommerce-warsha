import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [notification, setNotification] = useState('');

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES);
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (searchQuery) params.append('name', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const response = await axios.get(
        `${API_ENDPOINTS.PRODUCTS_SEARCH}?${params.toString()}`
      );
      setProducts(response.data);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setNotification('Please login to add items to cart');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    const result = await addToCart(productId, 1);
    if (result.success) {
      setNotification('Added to cart!');
      setTimeout(() => setNotification(''), 3000);
    } else {
      setNotification(result.error || 'Failed to add to cart');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    fetchProducts();
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4 text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-800 pt-24 pb-12">
      {/* Notification */}
      {notification && (
        <div className="fixed top-24 right-4 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-slideInRight">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section
          className="relative  h-130 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: "url('/hero-img.webp')",
          }}
        >
          {/* Optional overlay for better text contrast */}
          <div className="absolute inset-0 bg-white/40"></div>

          {/* Content */}
          <div className="relative text-center mb-12 animate-fadeIn space-y-4">
            <h1 className="text-6xl font-bold text-slate-900">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-slate-500">
              Shop the latest trends and find your perfect match
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="p-6 mb-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-400 px-4 py-3 rounded-lg text-black placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-400 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-400 px-4 py-3 rounded-lg text-black placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className=" border border-gray-400 px-4 py-3 rounded-lg text-black placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className=" border border-gray-400 flex-1  text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                Search
              </button>
              <button
                onClick={clearFilters}
                className=" border border-gray-400 px-4 py-3  text-black rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl text-black mb-2">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/product/${product._id}`}>
                  <div className="h-48 flex items-center justify-center">
                    <div><p>product image</p></div>
                  </div>
                </Link>

                <div className="p-6">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-xl font-bold text-slate-700 mb-2 hover:text-slate-950 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-zinc-700 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-blue-900">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${product.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.quantity === 0}
                    className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all duration-300 ${product.quantity > 0
                        ? 'text-white hover:from-purple-600 hover:to-pink-600 shadow-lg bg-purple-600 hover:shadow-indigo-200'
                        : 'bg-indigo-950 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
