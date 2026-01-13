import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Categories from './components/Categories';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';


function App() {


  return (
    <>
      {/* <Home /> */}
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen">
              <Header />
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* ProtectedRoutes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
