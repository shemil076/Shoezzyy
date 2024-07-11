import React from 'react';
import { Shoe } from '../types/types';
import "../styles/ProductCard.css";
import { getReadableBrandName } from '../utils/helperFunctions';

interface ProductCardProps {
  shoe: Shoe;
  onCardClick: (shoe: Shoe) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, onCardClick }) => {

  return (
    <div className="product-card" onClick={() => onCardClick(shoe)}>
      <div className='product-image-container'>
        <img className="product-image" src={shoe.images[0]} alt="" />
      </div>
      <div className='product-detail-container'>
        <div className="product-brand">{getReadableBrandName(shoe.brand)}</div>
        <div className="product-name">{shoe.name}</div>
        <div className="product-price">Size: 36 - 45</div>
        {
          shoe.offerPrice ? (
            <div className="product-price">
          <s>LKR. {shoe.actualPrice}</s>
          <em className='product-card-offer-price'>  LKR. {shoe.offerPrice}</em>
          </div>
          ) : (
            <div className="product-price">
             LKR. {shoe.actualPrice}
          </div>
          )
        }
        <div className='product-card-payment-container'>
          <p className='payment-with-topic'>We accept,</p>
          <div className='payment-methods'>
            <p><strong>Bank Transfer</strong> & </p>
          <img src="/assets/koko.png" alt="" className="koko-image" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;


