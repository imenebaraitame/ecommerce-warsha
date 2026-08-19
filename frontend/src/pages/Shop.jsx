import { useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

import { ShoppingCart } from "lucide-react";
import ProductCard from "../components/ProductCard";

import useAddToCart from "../hooks/useAddToCart";
import { useCategories } from "../hooks/useCategories";
import { useProductSearch } from "../hooks/useProductSearch";
import { useProducts } from "../hooks/useProducts";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { handleAddToCart, notification } = useAddToCart();
  const [searchFilters, setSearchFilters] = useState(null);
  const {
    data: allProducts = [],
    isFetching: loadingAll,
    error: allError,
  } = useProducts();

  const {
    data: searchResults = [],
    isFetching: loadingSearch,
    error: searchError,
  } = useProductSearch(searchFilters);

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const products = searchFilters ? searchResults : allProducts;
  const loading = searchFilters ? loadingSearch : loadingAll;
  const error = searchFilters ? searchError : allError;

  const handleSearch = () => {
    setSearchFilters({
      name: searchQuery,
      category: selectedCategory,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    // fetchProducts();
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
