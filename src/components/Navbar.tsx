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

const Navbar = () => {
  const [ishoeModal, setIshoeModal] = useState(false);
  const [isCreateOrderModal, setIsCreateOrderModal] = useState(false);
  const [isUpdateOrderModal, setIsUpdateOrderModal] = useState(false);

  const openShoeModal = () => setIshoeModal(true);
  const closeShoeModal = () => setIshoeModal(false);

  const openCreateOrderModal = () => setIsCreateOrderModal(true);
  const closeCreateOrderModal = () => setIsCreateOrderModal(false);

  const openUpdateOrderModal = () => setIsUpdateOrderModal(true);
  const closeUpdateOrderModal = () => setIsUpdateOrderModal(false);

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
      <Link to="/product-page" className="navbar-link">Products</Link>
      <Link to="/track-order" className="navbar-link">Track Order</Link>
      <Link to="#" className="navbar-link">Sign In</Link>
      <div className='admin-button-container'>
      <Button className="regular-black-button" onClick={openShoeModal}>Add Product</Button>
      <Button className="regular-black-button" onClick={openCreateOrderModal}>Create Order</Button>
      <Button className="regular-black-button" onClick={openUpdateOrderModal}>Update Order</Button>
      <AddNewProductModal isOpen={ishoeModal} onClose={closeShoeModal}/>
      <CreateOrderModal isOpen={isCreateOrderModal} onClose={closeCreateOrderModal} onSave={()=>console.log("hi")}/>
      <UpdateOrderStatusModal isOpen={isUpdateOrderModal} onClose={closeUpdateOrderModal} onSave={()=>console.log("hi")}/>
      </div>
    </nav>
  );
}

export default Navbar;
