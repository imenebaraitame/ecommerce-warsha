import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [notification, setNotification] = useState("");

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_ENDPOINTS.PRODUCTS);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES);
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (searchQuery) params.append("name", searchQuery);
      if (selectedCategory) params.append("category", selectedCategory);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const response = await axios.get(
        `${API_ENDPOINTS.PRODUCTS_SEARCH}?${params.toString()}`,
      );
      setProducts(response.data);
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Error searching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      setNotification("Please login to add items to cart");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    const result = await addToCart(productId, 1);
    if (result.success) {
      setNotification("Added to cart!");
      setTimeout(() => setNotification(""), 3000);
    } else {
      setNotification(result.error || "Failed to add to cart");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    fetchProducts();
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-purple-500"></div>
          <p className="mt-4 text-xl text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 text-neutral-800">
      {/* Notification */}
      {notification && (
        <div className="animate-slideInRight fixed top-24 right-4 z-50 rounded-lg bg-white px-6 py-3 text-black shadow-2xl">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mt-4 mb-8 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-gray-400 px-4 py-3 text-black placeholder-purple-300 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-400 px-4 py-3 text-black transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
              className="rounded-lg border border-gray-400 px-4 py-3 text-black placeholder-purple-300 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="rounded-lg border border-gray-400 px-4 py-3 text-black placeholder-purple-300 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 rounded-lg border border-gray-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-gray-200"
              >
                Search
              </button>
              <button
                onClick={clearFilters}
                className="rounded-lg border border-gray-400 px-4 py-3 text-black transition-all duration-300 hover:bg-gray-200"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-500 bg-red-500/20 px-6 py-4 text-red-200">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="mb-2 text-2xl text-black">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
