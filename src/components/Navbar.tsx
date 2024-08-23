import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import '../styles/styles.css';
import '../styles/RegularButton.css';
import Button from './Button';
import AddNewProductModal from '../modals/AddNewProduct';
import CreateOrderModal from '../modals/CreateOrder';
import UpdateOrderStatusModal from '../modals/UpdateOrderStatus';
import SignInModal from '../modals/SignInModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectShoes } from '../selectors/shoeSelectors';
import { seletAdminToken } from '../selectors/adminSelectors';
import { AppDispatch } from '../store';
import { adminLogout } from "../features/adminSlice";

const Navbar: React.FC = () => {
  const shoes = useSelector(selectShoes);
  const adminToken = useSelector(seletAdminToken);
  const dispatch = useDispatch<AppDispatch>();

  const [isShoeModal, setIsShoeModal] = useState(false);
  const [isCreateOrderModal, setIsCreateOrderModal] = useState(false);
  const [isUpdateOrderModal, setIsUpdateOrderModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openShoeModal = () => setIsShoeModal(true);
  const closeShoeModal = () => {
    setIsShoeModal(false)
    closeMenu();
  };

  const openCreateOrderModal = () => setIsCreateOrderModal(true);
  const closeCreateOrderModal = () => {
    setIsCreateOrderModal(false);
    closeMenu();
  }

  const openUpdateOrderModal = () => setIsUpdateOrderModal(true);
  const closeUpdateOrderModal = () => {
    setIsUpdateOrderModal(false);
    closeMenu();
  }

  const openSignInModal = () => setIsSignInModal(true);
  const closeSignInModal = () => {
    setIsSignInModal(false);
    closeMenu();
  };

  const handleLogout = () => {
    dispatch(adminLogout());
    localStorage.removeItem('token');
  };

  return (
    <nav className="navbar">
      <div className={`navbar-header ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/">
          <img src="/assets/black-logo.png" alt="logo" className="logo" />
        </Link>
        <div className={`nav__hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
      </div>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
        <li>
        <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
        </li>
        <li>
        <Link to="/product-page" className="navbar-link" onClick={closeMenu}>Products</Link>
        </li>
        <li>
        <Link to="/track-order" className="navbar-link" onClick={closeMenu}>Track Order</Link>
        </li>
        <li onClick={closeMenu}>
        <a href="https://drive.google.com/file/d/1Jfc096_gil8biMO2kJmXsb5LPz8cllI7/view" target="_blank" rel="noopener noreferrer" className="navbar-link">Return Policy</a>
        </li>

        {!adminToken ? (
          <>
            <li>
            <Button className="regular-black-button" onClick={openSignInModal}>Sign In</Button>
            </li>
            <SignInModal isOpen={isSignInModal} onClose={closeSignInModal} />
          </>
        ) : (
          <li>
            <Button className="regular-black-button" onClick={handleLogout}>Sign Out</Button>
          </li>
        )}

        {adminToken && (
          <div className="admin-button-container">
            <li>
            <Button className="regular-black-button" onClick={openShoeModal}>Add Product</Button>
            </li>
            <li>
            <Button className="regular-black-button" onClick={openCreateOrderModal}>Create Order</Button>
            </li>
            <li>
            <Button className="regular-black-button" onClick={openUpdateOrderModal}>Update Order</Button>
            </li>
            <AddNewProductModal isOpen={isShoeModal} onClose={closeShoeModal} />
            <CreateOrderModal shoes={shoes} isOpen={isCreateOrderModal} onClose={closeCreateOrderModal} />
            <UpdateOrderStatusModal isOpen={isUpdateOrderModal} onClose={closeUpdateOrderModal} />
          </div>
        )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
