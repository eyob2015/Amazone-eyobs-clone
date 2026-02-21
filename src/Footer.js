// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer>
      {/* Back-to-top */}
      <div className="footer__topBar" onClick={scrollToTop}>
        Back to top
      </div>

      {/* Main links */}
      <div className="footer__main">
        <div className="footer__section">
          <h4>Get to Know Us</h4>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Amazon</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Amazon Devices</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Make Money with Us</h4>
          <ul>
            <li><a href="#">Sell products on Amazon</a></li>
            <li><a href="#">Sell on Amazon Business</a></li>
            <li><a href="#">Sell apps on Amazon</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Self-Publish with Us</a></li>
            <li><a href="#">Host an Amazon Hub</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Amazon Payment Products</h4>
          <ul>
            <li><a href="#">Amazon Business Card</a></li>
            <li><a href="#">Shop with Points</a></li>
            <li><a href="#">Reload Your Balance</a></li>
            <li><a href="#">Amazon Currency Converter</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Let Us Help You</h4>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Shipping Rates &amp; Policies</a></li>
            <li><a href="#">Returns &amp; Replacements</a></li>
            <li><a href="#">Manage Content &amp; Devices</a></li>
            <li><a href="#">Amazon Assistant</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="footer__sub">
        <div className="footer__subLinks">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Your Ads Privacy Choices</a>
          <a href="#">Interest-Based Ads</a>
          <a href="#">Cookie Preferences</a>
        </div>
        <p className="footer__copyright">
          &copy; 1996–2026, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;

