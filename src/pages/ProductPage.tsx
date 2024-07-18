import React from "react";
import SubNavBar from "../components/SubNavBar";
import '../styles/ProductPage.css';
import 'react-multi-carousel/lib/styles.css';


const ProductPage: React.FC = () => {

  return (
    <div>
      <div className="cover-container">
        <img src='/assets/productCover.jpg' alt='shoes-cover-image' className='cover-image' />
        <div className="cover-overlay">
          <h1 className="overlay-text">Available Products</h1>
          <p className="overlay-subtext">on</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>
        </div>
      </div>
      <SubNavBar />
    </div>
  );
};

export default ProductPage;

