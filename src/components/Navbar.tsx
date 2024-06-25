import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 
import '../styles/styles.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">
      <img src="/assets/shoezzyylogo.png" alt="logo" className="logo"/>
      </Link>
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/category/men" className="navbar-link">Men</Link>
      <Link to="/category/women" className="navbar-link">Women</Link>
      <Link to="/category/kids" className="navbar-link">Kids</Link>
      <Link to="/track-order" className="navbar-link">Track Order</Link>
      <Link to="#" className="navbar-link">Sign In</Link>
    </nav>
  );
};

export default Navbar;
