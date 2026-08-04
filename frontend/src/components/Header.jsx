import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { UserRound } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const cartCount = getCartItemsCount();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-[#a79a80] bg-white/10 text-black shadow-2xl backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-inverse-surface text-3xl font-semibold tracking-[0.08em]"
          >
            AURELIA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/"
              className="text-inverse-surface text-sm font-medium tracking-[0.25em] transition-colors duration-300 hover:text-primary"
            >
              HOME
            </Link>
            <Link
              to="/productList"
              className="text-inverse-surface text-sm font-medium tracking-[0.25em] transition-colors duration-300 hover:text-primary"
            >
              SHOP
            </Link>
            <Link
              to="/categories"
              className="text-inverse-surface text-sm font-medium tracking-[0.25em] transition-colors duration-300 hover:text-primary"
            >
              ABOUT
            </Link>

            {/* Show Dashboard only for admin users */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/dashboard"
                className="text-inverse-surface text-sm font-medium tracking-[0.25em] transition-colors duration-300 hover:text-primary"
              >
                DASHBOARD
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative transition-transform duration-300 hover:scale-110"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-lg font-medium transition-colors duration-300 hover:text-purple-300"
                  >
                    <span>{user?.name}</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-purple-500/30 bg-white shadow-xl transition-all duration-300">
                      <button
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-gray-200/30"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-inverse-surface text-[2px] font-medium transition-colors hover:text-primary"
                >
                  <UserRound size={20} />
                </Link>
                {/* <Link
                  to="/signup"
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-semibold shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-pink-500/50"
                >
                  Sign Up
                </Link> */}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none md:hidden"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="animate-fadeIn mt-4 space-y-4 pb-4 md:hidden">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-l block font-medium transition-colors duration-300 hover:text-primary"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
              className="text-l block font-medium transition-colors duration-300 hover:text-primary"
            >
              Categories
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-l block font-medium transition-colors duration-300 hover:text-primary"
            >
              Dashboard
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-lg font-medium transition-colors duration-300 hover:text-primary"
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="border-t border-purple-500/30 pt-2">
                  <p className="mb-2 text-sm text-primary">
                    Welcome, {user?.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-l font-medium transition-colors duration-300 hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-l block font-medium transition-colors duration-300 hover:text-primary"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
