import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import '../styles/ProductDetailModal.css';
import "../styles/RegularButton.css"
import Button from '../components/Button';
import { Shoe } from '../types/types';
import ConfirmationModal from '../components/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShoe } from '../features/shoeSlice';
import { AppDispatch } from '../store';
import { seletAdminToken } from '../selectors/adminSelectors';
import ToggleComponent from '../components/ToggleComponent';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoe: Shoe;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, shoe }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mainImage, setMainImage] = useState<string>(shoe.images[0]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [toggleState, setToggleState] = useState<boolean>(false);


  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);
  
  const handleToggle = () => {
    setToggleState(prevState => !prevState); // Toggle the boolean state
  };

  const adminToken = useSelector(seletAdminToken);

  useEffect(() => {
    if (isOpen) {
      setMainImage(shoe.images[0]);
    }
  }, [isOpen, shoe.images]);

  const handleDelete = () => {
    dispatch(deleteShoe(shoe._id));
  };

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
            <h3>Price: ${shoe.actualPrice}</h3>
            <div className='product-detail-description'>
              <p>{shoe.description}</p>
            </div>
          </div>
        </div>
        {adminToken ? <Button onClick={openConfirmation} className='regular-black-button'>
          Remove
        </Button> : null}

        <ToggleComponent/>

        <ConfirmationModal onClick={handleDelete} isOpen={isConfirmationOpen} onClose={closeConfirmation}/>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
// className="regular-black-button"


