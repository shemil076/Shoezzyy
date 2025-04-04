import React from 'react';
import { Shoe } from '../types/types';
import "../styles/ProductCard.css";
import { getReadableBrandName, getReadableModelName } from '../utils/helperFunctions';

interface ProductCardProps {
  shoe: Shoe;
  onCardClick: (shoe: Shoe) => void;
  isFromProductPage?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, onCardClick, isFromProductPage = false }) => {


  return (
    <div className="product-card" onClick={() => onCardClick(shoe)}>
      <div className='product-image-container'>
        <img className="product-image" src={shoe.images[0]} alt="" />
      </div>
      <div className='product-detail-container'>
        {shoe.model ? <div className="product-brand">{getReadableBrandName(shoe.brand)} {getReadableModelName(shoe.brand, shoe.model)}</div> :
          <div className="product-brand">{getReadableBrandName(shoe.brand)}</div>
        }
        <div className={isFromProductPage ? 'product-name-small ' : 'product-name'}>{shoe.name}</div>


        {!isFromProductPage ?  <>
          {
            shoe.offerPrice ? (
              <div className="product-price">
                <s>LKR. {shoe.actualPrice.toLocaleString()}</s>
                <em className='product-card-offer-price'>  LKR. {shoe.offerPrice.toLocaleString()}</em>
              </div>
            ) : (
              <div className="product-price">
                LKR. {shoe.actualPrice.toLocaleString()}
              </div>
            )
          }
          
        </> : <>
          {
            shoe.offerPrice ? (
              <div className="product-price">
                LKR. {shoe.offerPrice.toLocaleString()}
              </div>
            ) : (
              <div className="product-price">
                LKR. {shoe.actualPrice.toLocaleString()}
              </div>
            )
          }
          
        </>}


        {!isFromProductPage && <>
          {shoe.isInstantDelivery ? <p>Available size: {shoe.availableSize}</p> : <p>Available sizes: {shoe.minimumSize} - {shoe.maximumSize}</p>}
          <div className='product-card-payment-container'>
            <p className='payment-with-topic'>We accept,</p>
            <div className='payment-methods'>
              <p><strong>Bank Transfer</strong> & </p>
              <img src="/assets/koko.png" alt="" className="koko-image" />
            </div>
          </div>
        </>
        }

      </div>
    </div>
  );
};

export default ProductCard;


