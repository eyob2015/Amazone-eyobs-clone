import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Checkout from "./pages/Checkout/Checkout";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import { useStateValue } from "./context/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./components/layout/Footer";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Orders/Order";
import { auth } from "./services/firebase";

const promise = loadStripe(
  "pk_test_51OVLc2HjxnpOvxRWl5YIZ6YlWUdabpFjF1hHlMRS0aNUBrY4LdCjd4jTKgvToLjzeuKhKHePgJosQokqtXu9RL8V002dPdJwiw"
);

// Redirects unauthenticated users to /Login, preserving the intended destination
function ProtectedRoute({ children }) {
  const [{ user }] = useStateValue();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route
            path="/Payment"
            element={
              <ProtectedRoute>
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/PaymentSuccess" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path="/Orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/Order" element={<ProtectedRoute><Order /></ProtectedRoute>} />

          {/* New pages */}
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
