import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import { Brand } from '../types/enum';
import Button from '../components/Button';

interface AddNewProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewProductModal: React.FC<AddNewProductModalProps> = ({ isOpen, onClose }) => {
    const [shoeName, setShoeName] = useState('');
    const [shoeBrand, setShoeBrand] = useState('');
    const [shoePrice, setShoePrice] = useState('');
    const [shoeDescription, setShoeDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(shoeName !== '' && shoeBrand !== '' && shoePrice !== '' && shoeDescription !== '' && images.length > 0);
    }, [shoeName, shoeBrand, shoePrice, shoeDescription, images]);

    const handleSave = async () => {
        if (!isFormValid) return;

        const shoeData = { name: shoeName, brand: shoeBrand, price: shoePrice, description: shoeDescription, images };
        
        try {
            const response = await fetch('/api/shoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shoeData)
            });

            if (response.ok) {
                handleOnClose();
            } else {
                console.error('Error saving shoe');
            }
        } catch (error) {
            console.error('Error saving shoe:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        setImages(prevImages => [...prevImages, reader.result as string]);
                        setImageURLs(prevURLs => [...prevURLs, URL.createObjectURL(file)]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleOnClose = () => {
        onClose();
        setShoeName('');
        setShoeBrand('');
        setShoePrice('');
        setShoeDescription('');
        setImages([]);
        setImageURLs([]);
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
            <form>
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
                    </select>
                </div>
                <label>
                    Shoe Name:
                    <input
                        type="text"
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                        style={getInputStyle(shoeName)}
                    />
                </label>
                <label>
                    Price: $
                    <input
                        type="number"
                        value={shoePrice}
                        onChange={(e) => setShoePrice(e.target.value)}
                        style={getInputStyle(shoePrice)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={shoeDescription}
                        onChange={(e) => setShoeDescription(e.target.value)}
                        style={getInputStyle(shoeDescription)}
                    />
                </label>
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
                    <Button onClick={handleSave} isDisabled={!isFormValid} className='modal-button'>
                        Save
                    </Button>
                    <Button onClick={handleOnClose} className='modal-button'>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddNewProductModal;
