import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const icons = {
    'Electronics': '/icons/electronics.webp',
    'Accessories': '/icons/accessories.webp',
    'Furniture': '/icons/furniture.webp',
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_ENDPOINTS.CATEGORIES);
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (categoryName) => {
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="text-black mt-4 text-xl">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-black">
            Browse Categories
          </h1>
          <p className="text-xl text-slate-900">
            Discover products by category
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-8 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl text-black mb-2">No categories found</h3>
            <p className="text-slate-900">Categories will appear here once they are added</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
                className="group bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">

                  <img
                    src={icons[category.name]}
                    alt={category.name}
                    className="object-contain mb-2"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>

                {/* Arrow */}
                <div className="flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2">Explore</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-lg text-black px-6 py-3 rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-purple-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Shop</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default Categories;
