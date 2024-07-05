import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 
import '../styles/styles.css';
import '../styles/RegularButton.css';
import { Brand } from '../types/enum';
import { getReadableBrandName } from '../utils/helperFunctions';
import Button from './Button';
import AddNewProductModal from '../modals/AddNewProduct';
import CreateOrderModal from '../modals/CreateOrder';
import UpdateOrderStatusModal from '../modals/UpdateOrderStatus';
import { useDispatch, useSelector } from 'react-redux';
import { selectShoes } from '../selectors/shoeSelectors';
import { seletAdminToken } from '../selectors/adminSelectors';
import SignInModal from '../modals/SignInModal';
import { AppDispatch } from '../store';
import { adminLogout } from "../features/adminSlice";

const Navbar = () => {
  const shoes = useSelector(selectShoes);

  const [ishoeModal, setIshoeModal] = useState(false);
  const [isCreateOrderModal, setIsCreateOrderModal] = useState(false);
  const [isUpdateOrderModal, setIsUpdateOrderModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);

  const openShoeModal = () => setIshoeModal(true);
  const closeShoeModal = () => setIshoeModal(false);

  const openCreateOrderModal = () => setIsCreateOrderModal(true);
  const closeCreateOrderModal = () => setIsCreateOrderModal(false);

  const openUpdateOrderModal = () => setIsUpdateOrderModal(true);
  const closeUpdateOrderModal = () => setIsUpdateOrderModal(false);

  const openSignInModal = () => setIsSignInModal(true);
  const closeSignInModal = () => setIsSignInModal(false);

  const adminToken = useSelector(seletAdminToken);

  const createBrandUrl = (brand: string) => {
    return `/${brand.replace(/\s+/g, '-')}`;
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(adminLogout());
    localStorage.removeItem('token');
  };

  console.log("admintoken", adminToken);
  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/assets/shoezzyylogo.png" alt="logo" className="logo"/>
      </Link>
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/product-page" className="navbar-link">Products</Link>
      <Link to="/track-order" className="navbar-link">Track Order</Link>
      {/* <Link to="/signIn" className="navbar-link">Sign In</Link> */}

      {!adminToken ? 
      <><Button className="regular-black-button" onClick={openSignInModal}>SignIn</Button>
      <SignInModal isOpen={isSignInModal} onClose={closeSignInModal}/></>
      :
      <Button className="regular-black-button" onClick={handleLogout}>SignOut</Button>
      }

      {adminToken ? <div className='admin-button-container'>
      <Button className="regular-black-button" onClick={openShoeModal}>Add Product</Button>
      <Button className="regular-black-button" onClick={openCreateOrderModal}>Create Order</Button>
      <Button className="regular-black-button" onClick={openUpdateOrderModal}>Update Order</Button>
      <AddNewProductModal isOpen={ishoeModal} onClose={closeShoeModal}/>
      <CreateOrderModal shoes={shoes} isOpen={isCreateOrderModal} onClose={closeCreateOrderModal} />
      <UpdateOrderStatusModal isOpen={isUpdateOrderModal} onClose={closeUpdateOrderModal}/>
      </div> : null}
    </nav>
  );
}

export default Navbar;
