import React, { useState } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import { ProductCategory, Brand } from '../types/enum';
import Button from '../components/Button';


interface AddNewProductModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSave: (shoeData: { shoeName: string; shoeType: string }) => void;
}

const AddNewProductModal: React.FC<AddNewProductModalProps> = ({ isOpen, onClose, onSave }) => {
    const [shoeName, setShoeName] = useState('');
    const [prductType, setProductType] = useState("");
    const [shoeType, setShoeType] = useState('');

    const handleSave = () => {
        onSave({ shoeName, shoeType });
        setShoeName('');
        setShoeType('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>New Product</h2>
            <form>
                <label>
                    Product Type:
                    <select
                        value={prductType}
                        onChange={(e) => setProductType(e.target.value as ProductCategory)}
                    >
                        <option value={ProductCategory.SHOES}>Shoes</option>
                        <option value={ProductCategory.EYEWEAR}>Eyewear</option>
                    </select>
                </label>
                {prductType == ProductCategory.SHOES ? <label>
                    Shoe Brand:
                    <select
                        value={shoeType}
                        onChange={(e) => setShoeType(e.target.value as Brand)}
                    >
                        <option value={Brand.ADIDAS}>Adidas</option>
                        <option value={Brand.ALLSTARCONVERSE}>All Star Converse</option>
                        <option value={Brand.NEWBALANCE}>New Balance</option>
                        <option value={Brand.NIKE}>Nike</option>
                        <option value={Brand.VANSOLDSKOOL}>Vans Old Skool</option>
                    </select>
                </label> : null}
                <label>
                    Shoe Name:
                    <input
                        type="text"
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                    />
                </label>
                <Button  onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onClose || (() => {})}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default AddNewProductModal;
