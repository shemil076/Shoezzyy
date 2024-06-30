import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import '../styles/ProductDetailModal.css';
import Button from '../components/Button';
import { Shoe } from '../types/types';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoe: Shoe;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, shoe }) => {
  const [mainImage, setMainImage] = useState<string>(shoe.images[0]);

  useEffect(() => {
    if (isOpen) {
      setMainImage(shoe.images[0]);
    }
  }, [isOpen, shoe.images]);

  const decodeImages = (images: string[]) => {
    return images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Product image ${index + 1}`}
        className="product-detail-individual-image"
        onMouseEnter={() => setMainImage(image)}
      />
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName="modal-overlay-custom"
      contentClassName="modal-content-custom-product-detail"
    >
      <div className='product-detail-main-container'>
        <div className='product-detail-modal-upper-section'>
          <div className='product-detail-multiple-image-container'>
            {decodeImages(shoe.images)}
          </div>
          <div className='product-detail-image-container'>
            <img className="product-main-image" src={mainImage} alt="" />
          </div>
          <div className='product-detail-text-container'>
            <h2>{shoe.name}</h2>
            <h3>${shoe.price}</h3>
            <div className='product-detail-description'>
              <p>{shoe.description}</p>
            </div>
          </div>
        </div>
        <Button onClick={onClose} className='modal-button'>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
