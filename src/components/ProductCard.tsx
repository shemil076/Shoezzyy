import React from 'react';
import '../styles/ProductCard.css';

interface ProductCardProps {
  image: string;
  price: number;
  name: string;
  thumbnails?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ image, price, name, thumbnails }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="Product" />
      </div>
      <div className="product-thumbnails">
        {/* {thumbnails.map((thumb, index) => (
          <img key={index} src={thumb} alt={`Thumbnail ${index + 1}`} />
        ))} */}
      </div>
      <div className="product-price">${price}</div>
      <div className="product-price">{name}</div>
    </div>
  );
}

export default ProductCard;
