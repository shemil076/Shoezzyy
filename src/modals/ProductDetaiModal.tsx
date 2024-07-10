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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getReadableBrandName } from '../utils/helperFunctions';

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
  const [isToggleUpdated, setIsToggleUpdated] = useState<boolean>(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleState(event.target.value === 'true'); // Update the toggle state
  };

  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);


  const adminToken = useSelector(seletAdminToken);

  const handleSave = async () => {
    const updatedStatus = {
      _id: shoe._id,
      isATopPick: toggleState,
    };
    console.log("_id", shoe._id);
    console.log("toggleState", toggleState);
    try {
      const response = await fetch('/api/shoes/isATopPick', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStatus)
      });

      if (response.ok) {
        console.log(response)
        onClose();
      } else {
        console.error('Error updating status');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  useEffect(() => {
    setToggleState(shoe.isATopPick);
  }, [shoe]);

  useEffect(() => {
    if (toggleState !== shoe.isATopPick) {
      setIsToggleUpdated(true);
    } else {
      setIsToggleUpdated(false);
    }

  }, [toggleState]);

  useEffect(() => {
    if (isOpen) {
      setMainImage(shoe.images[0]);
    }
  }, [isOpen, shoe.images]);

  const handleDelete = () => {
    onClose();
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
            <h3>{getReadableBrandName(shoe.brand)}</h3>
            <h1>{shoe.name}</h1>
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
            <div className='product-detail-description'>
              <p>{shoe.description}</p>
            </div>
          </div>
        </div>

        {adminToken ? <div className='top-pick-section'>
          <p >Is a Top Pick: </p>
          <RadioGroup
            aria-label="toggle example"
            name="toggle-example"
            value={toggleState}
            onChange={handleToggle}
            row
            className="radio-button-group"
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </div> : null}

        {adminToken && !isToggleUpdated ? <Button onClick={openConfirmation} className='regular-black-button'>
          Remove
        </Button> : null}

        {isToggleUpdated ? <Button onClick={handleSave} className='regular-black-button'>
          Save
        </Button> : null}



        <ConfirmationModal onClick={handleDelete} isOpen={isConfirmationOpen} onClose={closeConfirmation} />
      </div>
    </Modal>
  );
};

export default ProductDetailModal;


