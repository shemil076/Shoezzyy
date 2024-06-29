import React, { useState } from 'react';
import { Shoe } from '../types/types';
import "../styles/ProductCard.css";

interface ProductCardProps {
  shoe: Shoe;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, onClick}) => {
  const [mainImage, setMainImage] = useState<string>(shoe.images[0]);

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
    <div className="product-card" onClick={onClick}>
      <div className='product-image-container'>
        <img className="product-image" src={mainImage} alt="" />
      </div>
      <div className='product-multiple-image-container'>
        {decodeImages(shoe.images)}
      </div>
      <div className='product-detail-container'>
        <div className="product-name">{shoe.name}</div>
        <div className="product-brand">{shoe.brand}</div>
        <div className="product-price">$ {shoe.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
