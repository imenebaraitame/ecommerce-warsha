import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
      <div className="animate-fadeIn w-full max-w-md">
        <div className="rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 bg-clip-text text-4xl font-bold text-transparent">
              Welcome Back
            </h1>
            <p className="text-black">Login to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="animate-shake mb-6 rounded-lg border border-red-500 bg-red-500/20 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg bg-slate-300 px-4 py-3 text-black placeholder-black transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-300 px-4 py-3 text-black placeholder-gray-50 transition-all focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:from-purple-400 hover:to-purple-400 hover:shadow-pink-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-purple-500/30"></div>
            <span className="px-4 text-sm text-purple-300">or</span>
            <div className="flex-1 border-t border-purple-500/30"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-purple-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-pink-500 transition-colors duration-300 hover:text-pink-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-black transition-colors duration-300 hover:text-purple-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
