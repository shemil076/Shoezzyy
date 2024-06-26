import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 
import '../styles/styles.css';
import '../styles/RegularButton.css';
import { Brand } from '../types/enum';
import { getReadableBrandName } from '../utils/helperFunctions';
import Button from './Button';

const Navbar = () => {
  // Function to create URLs with hyphens instead of spaces
  const createBrandUrl = (brand: string) => {
    return `/${brand.replace(/\s+/g, '-')}`;
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/assets/shoezzyylogo.png" alt="logo" className="logo"/>
      </Link>
      <Link to="/" className="navbar-link">Home</Link>
      {Object.values(Brand).map((brand) => (
        <Link key={brand} to={createBrandUrl(brand)} className="navbar-link">
          {getReadableBrandName(brand)}
        </Link>
      ))}
      <Link to="/track-order" className="navbar-link">Track Order</Link>
      <Link to="#" className="navbar-link">Sign In</Link>
      <Button className="regular-black-button" onClick={()=> console.log("clicked")}>Add Product</Button>
      <Button className="regular-black-button" onClick={()=> console.log("clicked")}>Order Status</Button>
    </nav>
  );
}

export default Navbar;
