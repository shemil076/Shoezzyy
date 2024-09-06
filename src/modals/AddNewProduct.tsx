import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import { AdidasTypes, Brand, NewBalanceTypes, NikeTypes } from '../types/enum';
import Button from '../components/Button';
import { getReadableModelName } from '../utils/helperFunctions';

interface AddNewProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewProductModal: React.FC<AddNewProductModalProps> = ({ isOpen, onClose }) => {
    const [shoeName, setShoeName] = useState('');
    const [shoeBrand, setShoeBrand] = useState('');
    const [shoePrice, setShoePrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [shoeDescription, setShoeDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [shoeModel, setShoeModel] = useState('');
    const [sizeUrl, setSizeUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [minSize, setMinSize] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [isInstantDelivery, setIsInstantDelivery] = useState<boolean>(false);
    const [availableSize, setAvailableSize] = useState('');

    useEffect(() => {
        if(!isInstantDelivery){
            setIsFormValid(shoeName !== '' && shoeBrand !== '' && shoePrice !== '' && shoeDescription !== '' && images.length > 0 && maxSize != '' && minSize != '' );
        }else{
            setIsFormValid(shoeName !== '' && shoeBrand !== '' && shoePrice !== '' && shoeDescription !== '' && images.length > 0 && availableSize != '' );
        }
    }, [shoeName, shoeBrand, shoePrice, shoeDescription, images, shoeModel, minSize, maxSize, isInstantDelivery, availableSize]);


    const handleSave = async () => {
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', shoeName);
        formData.append('brand', shoeBrand);
        formData.append('actualPrice', shoePrice);
        formData.append('description', shoeDescription);
        formData.append('offerPrice', offerPrice);
        formData.append('model', shoeModel);
        formData.append('sizeUrl', sizeUrl);
        formData.append('isInstantDelivery',isInstantDelivery.toString());
        
        formData.append('minSize', minSize);
        formData.append('maxSize', maxSize);
        formData.append('availableSize',availableSize);


        images.forEach((image, index) => {
            formData.append('images', image); // Append each image file
        });

        try {
            const response = await fetch('/api/shoes', {
                method: 'POST',
                body: formData // Send the FormData
            });

            if (response.ok) {
                handleOnClose();
                window.location.reload();
            } else {
                console.error('Error saving shoe');
            }
        } catch (error) {
            console.error('Error saving shoe:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (files.length + images.length > 4) {
                alert('You can only upload up to 4 images.');
                return;
            }

            setImages(prevImages => [...prevImages, ...files]);
            setImageURLs(prevURLs => [
                ...prevURLs,
                ...files.map(file => URL.createObjectURL(file))
            ]);
        }
    };


    const handleOnClose = () => {
        onClose();
        setShoeName('');
        setShoeBrand('');
        setShoePrice('');
        setOfferPrice('');
        setShoeDescription('');
        setImages([]);
        setImageURLs([]);
        setMaxSize('');
        setMinSize('');
        setSizeUrl('');
        setAvailableSize('');
        setIsInstantDelivery(false);
    };

    const getShoeTypeOptions = () => {
        switch (shoeBrand) {
            case Brand.ADIDAS:
                return Object.values(AdidasTypes).map(type => (
                    <option key={type} value={type}>{getReadableModelName(Brand.ADIDAS, type)}</option>
                ));
            case Brand.NEWBALANCE:
                return Object.values(NewBalanceTypes).map(type => (
                    <option key={type} value={type}>{getReadableModelName(Brand.NEWBALANCE, type)}</option>
                ));
            case Brand.NIKE:
                return Object.values(NikeTypes).map(type => (
                    <option key={type} value={type}>{getReadableModelName(Brand.NIKE, type)}</option>
                ));
            default:
                return null;
        }
    };

    const getInputStyle = (value: string) => ({
        borderColor: value === '' ? 'red' : 'initial'
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleOnClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>New Product</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div>
                    Shoe Brand:
                    <select
                        value={shoeBrand}
                        onChange={(e) => setShoeBrand(e.target.value as Brand)}
                        style={getInputStyle(shoeBrand)}
                    >
                        <option value="">Select a brand</option>
                        <option value={Brand.ADIDAS}>Adidas</option>
                        <option value={Brand.ALLSTARCONVERSE}>All Star Converse</option>
                        <option value={Brand.NEWBALANCE}>New Balance</option>
                        <option value={Brand.NIKE}>Nike</option>
                        <option value={Brand.VANSOLDSKOOL}>Vans Old Skool</option>
                        <option value={Brand.OTHER}>Other</option>
                    </select>
                </div>
                {shoeBrand === Brand.ADIDAS || shoeBrand === Brand.NEWBALANCE || shoeBrand === Brand.NIKE ? (
                    <div>
                        <label>
                            Shoe Model:
                            <select
                                value={shoeModel}
                                onChange={(e) => setShoeModel(e.target.value)}
                                style={getInputStyle(shoeModel)}
                            >
                                <option value="">Select a shoe type</option>
                                {getShoeTypeOptions()}
                            </select>
                        </label>
                    </div>
                ) : null}
                <label>
                    Shoe Name:
                    <input
                        type="text"
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                        style={getInputStyle(shoeName)}
                        placeholder='Enter the shoe name'
                    />
                </label>
                <label>
                    Price: LKR
                    <input
                        type="number"
                        value={shoePrice}
                        onChange={(e) => setShoePrice(e.target.value)}
                        style={getInputStyle(shoePrice)}
                        placeholder='Enter the price'
                    />
                </label>
                <label>
                    Price after discount: LKR
                    <input
                        type="number"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        style={getInputStyle(shoePrice)}
                        placeholder='Enter the price after the discount'
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={shoeDescription}
                        onChange={(e) => setShoeDescription(e.target.value)}
                        style={getInputStyle(shoeDescription)}
                        placeholder='Description'
                    />
                </label>
                <label>
                    Size Url:
                    <input
                        type="text"
                        value={sizeUrl}
                        onChange={(e) => setSizeUrl(e.target.value)}
                        style={getInputStyle(sizeUrl)}
                        placeholder='Enter the link to the sizes'
                    />
                </label>

                <label className='is-instant-delivery-input'>
                    Instant Delivery:
                    <input type="checkbox"
                        defaultChecked={isInstantDelivery}
                        onChange={() => setIsInstantDelivery(!isInstantDelivery)}
                        id='is-instant-delivery-checkbox'
                    />
                </label>

                {isInstantDelivery ? <label>
                    Available Size:
                    <input
                        type="number"
                        value={availableSize}
                        onChange={(e) => setAvailableSize(e.target.value)}
                        style={getInputStyle(availableSize)}
                        placeholder='Enter the available sizes'
                    />
                </label> :
                    <div className='size-input-fields'>
                        <label>
                            Minimum Size:
                            <input
                                type="number"
                                value={minSize}
                                onChange={(e) => setMinSize(e.target.value)}
                                style={getInputStyle(minSize)}
                                placeholder='Enter the minimum sizes'
                            />
                        </label>
                        <label>
                            Maximum Size :
                            <input
                                type="number"
                                value={maxSize}
                                onChange={(e) => setMaxSize(e.target.value)}
                                style={getInputStyle(maxSize)}
                                placeholder='Enter the maximum sizes'
                            />
                        </label>
                    </div>}

                <label>
                    Upload Images:
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        style={{ borderColor: images.length === 0 ? 'red' : 'initial' }}
                    />
                </label>
                {imageURLs.length > 0 && (
                    <div className="image-preview">
                        {imageURLs.map((url, index) => (
                            <img key={index} src={url} alt={`Preview ${index + 1}`} className="image-preview-thumbnail" />
                        ))}
                    </div>
                )}
                <div className="button-group">
                    <Button onClick={handleOnClose} className='modal-button'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} isDisabled={!isFormValid || isSubmitting} className='modal-button'>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddNewProductModal;
