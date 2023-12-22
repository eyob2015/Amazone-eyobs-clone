// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h4>Get to Know Us</h4>
        <ul>
          <li>Careers</li>
          <li>Blog</li>
          <li>About Amazon</li>
          <li>Investor Relations</li>
          <li>Amazon Devices</li>
          <li>Amazon Science</li>
        </ul>
      </div>
      <div className="footer__section">
        <h4>Make Money with Us</h4>
        <ul>
          <li>Sell products on Amazon</li>
          <li>Sell on Amazon Business</li>
          <li>Sell apps on Amazon</li>
          <li>Become an Affiliate</li>
          <li>Advertise Your Products</li>
          <li>Self-Publish with Us</li>
          <li>Host an Amazon Hub</li>
          <li>See More Make Money with Us</li>
        </ul>
      </div>
      <div className="footer__section">
        <h4>Amazon Payment Products</h4>
        <ul>
          <li>Amazon Business Card</li>
          <li>Shop with Points</li>
          <li>Reload Your Balance</li>
          <li>Amazon Currency Converter</li>
        </ul>
      </div>
      <div className="footer__section">
        <h4>Let Us Help You</h4>
        <ul>
          <li>Amazon and COVID-19</li>
          <li>Your Account</li>
          <li>Your Orders</li>
          <li>Shipping Rates & Policies</li>
          <li>Returns & Replacements</li>
          <li>Manage Your Content and Devices</li>
          <li>Amazon Assistant</li>
          <li>Help</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
