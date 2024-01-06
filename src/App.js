import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./Checkout";
import PaymentSuccess from "./PaymentSuccess";


import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./Footer";
import Payment from "./Payment";
import Orders from "./Orders"
import Order from "./Order"
import {auth} from "./firebase"
const promise = loadStripe(
  "pk_test_51OVLc2HjxnpOvxRWl5YIZ6YlWUdabpFjF1hHlMRS0aNUBrY4LdCjd4jTKgvToLjzeuKhKHePgJosQokqtXu9RL8V002dPdJwiw"
);



function App() {
  const [{ basket, user }, dispatch] = useStateValue();

  // will only run once when the app component mounts
useEffect(() => {
  auth.onAuthStateChanged(authUser => {
    console.log('THE USER IS >>>', authUser);

    if (authUser) {
      // the user just logged in / the user was already logged in
      dispatch({
        type: 'SET_USER',
        user: authUser
      });
    } else {
      // the user is logged out
      dispatch({
        type: 'SET_USER',
        user: null
      });
    }
  });
}, []);
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          // <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route
            path="/Payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          ></Route>
           <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
           <Route path="/Orders" element={<Orders />} />
           <Route path="/Order" element={<Order />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
