import React, { useState } from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../services/firebase";
import { getBasketItemCount } from "../../context/reducer";

import logo from "../../assets/amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      {/* ── Main bar ── */}
      <div className="header__top">
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          <img className="header__logo" src={logo} alt="Amazon Logo" />
        </Link>

        {/* Deliver to — hidden on mobile */}
        <div className="header__deliver header__deliver--desktop">
          <span><LocationOnIcon style={{ fontSize: 14 }} /> Deliver to</span>
          <span>United States</span>
        </div>

        {/* Search */}
        <div className="header__search">
          <select className="header__searchCategory" aria-label="Search category">
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Fashion</option>
            <option>Home & Kitchen</option>
            <option>Toys</option>
          </select>
          <input
            className="header__searchInput"
            type="text"
            placeholder="Search Amazon"
          />
          <div className="header__searchIcon">
            <SearchIcon />
          </div>
        </div>

        {/* Nav — desktop */}
        <div className="header__nav header__nav--desktop">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">
                Hello, {!user ? "Guest" : user.email?.split("@")[0]}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"} &nbsp;▾
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingCartIcon className="header__cartIcon" />
              <span className="header__basketCount">{getBasketItemCount(basket)}</span>
              <span className="header__cartText">Cart</span>
            </div>
          </Link>
        </div>

        {/* Mobile right — cart + hamburger */}
        <div className="header__mobileRight">
          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingCartIcon className="header__cartIcon" />
              <span className="header__basketCount">{getBasketItemCount(basket)}</span>
            </div>
          </Link>
          <button
            className="header__hamburger"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {mobileMenuOpen && (
        <div className="header__mobileMenu">
          <Link to={!user && "/login"} onClick={() => { handleAuthentication(); setMobileMenuOpen(false); }}>
            <div className="header__mobileItem">
              <span className="header__optionLineOne">Hello, {!user ? "Guest" : user.email?.split("@")[0]}</span>
              <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
            </div>
          </Link>
          <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
            <div className="header__mobileItem">
              <span className="header__optionLineTwo">Returns &amp; Orders</span>
            </div>
          </Link>
          <div className="header__mobileItem">
            <span className="header__optionLineTwo">Your Prime</span>
          </div>
          <div className="header__mobileDivider" />
          <div className="header__mobileItem header__mobileItem--small">
            <LocationOnIcon style={{ fontSize: 14, marginRight: 4 }} /> Deliver to United States
          </div>
        </div>
      )}

      {/* ── Sub-navigation bar ── */}
      <nav className="header__subnav">
        <div className="header__subnavItem header__subnavItem--all">
          <MenuIcon style={{ fontSize: 18 }} />
          All
        </div>
        {[
          "Today's Deals",
          "Customer Service",
          "Registry",
          "Gift Cards",
          "Sell",
          "Electronics",
          "Fashion",
          "Books",
          "Home & Kitchen",
          "Toys & Games",
          "Sports",
          "Automotive",
        ].map((item) => (
          <div key={item} className="header__subnavItem">
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Header;

