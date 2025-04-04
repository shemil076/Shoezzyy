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
  const closeShoeModal = () => setIsShoeModal(false);

  const openCreateOrderModal = () => setIsCreateOrderModal(true);
  const closeCreateOrderModal = () => setIsCreateOrderModal(false);

  const openUpdateOrderModal = () => setIsUpdateOrderModal(true);
  const closeUpdateOrderModal = () => setIsUpdateOrderModal(false);

  const openSignInModal = () => setIsSignInModal(true);
  const closeSignInModal = () => setIsSignInModal(false);

  const handleLogout = () => {
    dispatch(adminLogout());
    localStorage.removeItem('token');
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/">
          <img src="/assets/black-logo.PNG" alt="logo" className="logo" />
        </Link>
        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        </div>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-link" onClick={closeMenu}>
          Home
          {isMenuOpen ? <hr className='nav-bar-section-devider'/> :null}
        </Link>
        <Link to="/product-page" className="navbar-link" onClick={closeMenu}>
          Products
          {isMenuOpen ? <hr className='nav-bar-section-devider'/> :null}
        </Link>
        <Link to="/track-order" className="navbar-link" onClick={closeMenu}>
          Track Order
          {isMenuOpen ? <hr className='nav-bar-section-devider' /> :null}
        </Link>
        <a href="https://drive.google.com/file/d/1Jfc096_gil8biMO2kJmXsb5LPz8cllI7/view" target="_blank" rel="noopener noreferrer" className="navbar-link">
        Return Policy
        {isMenuOpen ? <hr className='nav-bar-section-devider' /> :null}
        </a>

        {!adminToken ? (
          <>
            <Button className="regular-black-button" onClick={openSignInModal}>Sign In</Button>
            <SignInModal isOpen={isSignInModal} onClose={closeSignInModal} />
          </>
        ) : (
          <Button className="regular-black-button" onClick={handleLogout}>Sign Out</Button>
        )}

        {adminToken && (
          <div className="admin-button-container">
            <Button className="regular-black-button" onClick={openShoeModal}>Add Product</Button>
            <Button className="regular-black-button" onClick={openCreateOrderModal}>Create Order</Button>
            <Button className="regular-black-button" onClick={openUpdateOrderModal}>Update Order</Button>
            <AddNewProductModal isOpen={isShoeModal} onClose={closeShoeModal} />
            <CreateOrderModal shoes={shoes} isOpen={isCreateOrderModal} onClose={closeCreateOrderModal} />
            <UpdateOrderStatusModal isOpen={isUpdateOrderModal} onClose={closeUpdateOrderModal} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
