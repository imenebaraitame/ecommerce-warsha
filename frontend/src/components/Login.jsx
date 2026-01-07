import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login({ email, password });
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="rounded-2xl p-8 shadow-2xl border border-purple-500/30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-black">Login to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 animate-shake">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-300 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-black font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg  bg-slate-300 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-black py-3 rounded-lg hover:from-purple-400 hover:to-purple-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-purple-500/30"></div>
            <span className="px-4 text-purple-300 text-sm">or</span>
            <div className="flex-1 border-t border-purple-500/30"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-purple-500">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-pink-500 hover:text-pink-700 font-semibold transition-colors duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-black hover:text-purple-600 transition-colors duration-300 inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
