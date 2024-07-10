import React, { useState } from 'react';
import { Shoe } from '../types/types';
import "../styles/ProductCard.css";

interface ProductCardProps {
  shoe: Shoe;
  onCardClick: (shoe: Shoe) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, onCardClick }) => {
  const [mainImage, setMainImage] = useState<string>(shoe.images[0]);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);

  const openProductDetailModal = () => setIsProductDetailModalOpen(true);
  const closeProductDetailModal = () => setIsProductDetailModalOpen(false);

  const decodeImages = (images: string[]) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Product image ${index + 1}`}
        className="product-individual-image"
        onMouseEnter={() => setMainImage(image)}
      />
    ));
  };

  return (
    <div className="product-card" onClick={() => onCardClick(shoe)}>
      <div className='product-image-container'>
        <img className="product-image" src={mainImage} alt="" />
        {/* <div className='overlay'>
          <p>More</p>
        </div> */}
      </div>
      {/* <div className='product-multiple-image-container'>
        {decodeImages(shoe.images)}
      </div> */}
      <div className='product-detail-container'>
        <div className="product-brand">{shoe.brand}</div>
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
      {/* <ProductDetailModal isOpen={isProductDetailModalOpen} shoe={shoe} onClose={closeProductDetailModal} /> */}
    </div>
  );
};

export default ProductCard;

// Brandd
// Name
// sizes 36-45
// price
// payments 
