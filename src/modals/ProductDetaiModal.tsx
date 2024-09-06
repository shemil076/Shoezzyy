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
import { getReadableBrandName, getReadableModelName } from '../utils/helperFunctions';
import UpdatePrice from './UpdatePrice';
import UpdateSize from './UpdateSize';
import UpdateShoeStringData from './UpdateShoeStringData';

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
  const [isOpenPriceUpdate, setIsOpenPriceUpdate] = useState<boolean>(false);
  const [isOpenSizeUpdate, setIsOpenSizeUpdate] = useState<boolean>(false);
  const [isOpenNameUpdate, SetIsOpenNameUpdate] = useState<boolean>(false);
  const [isOpenDescriptionUpdate, SetIsOpenDescriptionUpdate] = useState<boolean>(false);
  const [isInstantDeliveryUpdated, setIsInstantDeliveryUpdated] = useState<boolean>(false);
  const [isInstantDelivery, setIsInstantDelivery] = useState<boolean>(shoe.isInstantDelivery);
  const [availableSize, setAvailableSize] = useState('');

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleState(event.target.value === 'true'); // Update the toggle state
  };

  const openConfirmation = () => setIsConfirmationOpen(true);
  const closeConfirmation = () => setIsConfirmationOpen(false);

  const openPriceUpdate = () => setIsOpenPriceUpdate(true);
  const closePriceUpdate = () => setIsOpenPriceUpdate(false);

  const openSizeUpdate = () => setIsOpenSizeUpdate(true);
  const closeSizeUpdate = () => setIsOpenSizeUpdate(false);

  const openNameUpdate = () => SetIsOpenNameUpdate(true);
  const closeNameUpdate = () => SetIsOpenNameUpdate(false);

  const openDescriptionUpdate = () => SetIsOpenDescriptionUpdate(true);
  const closeDescriptionUpdate = () => SetIsOpenDescriptionUpdate(false);


  const adminToken = useSelector(seletAdminToken);

  const handleSave = async () => {
    const updatedStatus = {
      _id: shoe._id,
      isATopPick: toggleState,
    };

    try {
      const response = await fetch('/api/shoes/isATopPick', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStatus)
      });

      if (response.ok) {
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
            <div>
              {shoe.model ? <h3> {getReadableBrandName(shoe.brand)} {getReadableModelName(shoe.brand, shoe.model)}</h3> :
                <h3>{getReadableBrandName(shoe.brand)}</h3>
              }
            </div>
            <h1>{shoe.name}</h1>
            {adminToken && <Button onClick={openNameUpdate} className='regular-black-button'>
          Update Name
        </Button>}
        
        {shoe.isInstantDelivery ? <p>Available size: {shoe.availableSize}</p> : <p>Available sizes: {shoe.minimumSize} - {shoe.maximumSize}</p>}
            {adminToken && !shoe.isInstantDelivery ? <Button onClick={openSizeUpdate} className='regular-black-button'>
          Update Size
        </Button>: null}
        
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
            {adminToken ? <Button onClick={openPriceUpdate} className='regular-black-button'>
          Update Price
        </Button>: null}
        
       
            <div className='instructions-container'>
              <p className='instructions'>How to place the order? &nbsp;
              <a href='https://drive.google.com/file/d/1XXNr-157HdS9gm19Y82J-BYu6jO08eRS/view?usp=drive_link' target='blank' style={{ textDecoration: 'none' }}>&#9432;</a>
                </p>
              <p className='instructions'>Free delivery islandwide.</p>
              <div className='instructions-payments'>
                <p>Bank Transfer & </p>
                <img src="/assets/koko.png" alt="" className="koko-image" />
              </div>
            </div>
            <div className='product-detail-description'>
              <p>{shoe.description}</p>
              {adminToken && <Button onClick={openDescriptionUpdate} className='regular-black-button'>
          Update Description
        </Button>}
            </div>
            <p>Size chart &nbsp;
              <a href={shoe.sizeUrl} target='blank' style={{ textDecoration: 'none' }}>&#9432;</a>

            </p>
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
        
      </div>

      <UpdateShoeStringData isOpen={isOpenNameUpdate} onClose={closeNameUpdate} shoe={shoe} isNameToChange={true}/>
      <UpdateShoeStringData isOpen={isOpenDescriptionUpdate} onClose={closeDescriptionUpdate} shoe={shoe}/>
      <UpdateSize shoe={shoe} isOpen={isOpenSizeUpdate} onClose={closeSizeUpdate}/>
      <UpdatePrice shoe={shoe} isOpen={isOpenPriceUpdate} onClose={closePriceUpdate}/>
      <ConfirmationModal onClick={handleDelete} isOpen={isConfirmationOpen} onClose={closeConfirmation} />
    </Modal>
  );
};

export default ProductDetailModal;


