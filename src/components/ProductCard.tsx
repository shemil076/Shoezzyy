import React, { useState } from 'react';
import { Shoe } from '../types/types';
import "../styles/ProductCard.css";
import ProductDetailModal from '../modals/ProductDetaiModal';


interface ProductCardProps {
  shoe: Shoe;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe }) => {
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
    <div className="product-card" onClick={openProductDetailModal}>
      <div className='product-image-container'>
        <img className="product-image" src={mainImage} alt="" />
        {/* <div className='overlay'>
          <p>More</p>
        </div> */}
      </div>
      <div className='product-multiple-image-container'>
        {decodeImages(shoe.images)}
      </div>
      <div className='product-detail-container'>
        <div className="product-name">{shoe.name}</div>
        <div className="product-brand">{shoe.brand}</div>
        <div className="product-price">$ {shoe.price}</div>
      </div>
      <ProductDetailModal isOpen={isProductDetailModalOpen} shoe={shoe} onClose={closeProductDetailModal} />
    </div>
  );
};

export default ProductCard;
