import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import ProductDetail from './components/pages/ProductDetail';
import EditProduct from './components/pages/EditProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import SellModal from './components/SellModal/SellModal';
// -----------------------------------------------------------------------------------------------------------------
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (!user) {
    toast.warn("You must be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
};
// -------------------------------------------------------------------------------------------------------
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === undefined) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};
// -------------------------------------------------------------------------------------------------------------

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route
            path="/post-ad"
            element={
              <ProtectedRoute>
                <SellModal />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
