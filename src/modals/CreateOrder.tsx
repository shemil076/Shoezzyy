import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import { ProductCategory, Brand } from '../types/enum';
import Button from '../components/Button';


interface CreateOrderModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSave: (shoeData: { shoeName: string; shoeType: string }) => void;
}

const fetchBrands = async () => {
    const response = await fetch('/api/shoes/brands');
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    return response.json();
  };

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onSave }) => {
    const [orderId, setOrderID] = useState('');
    const [shoeName, setShoeName] = useState('');
    const [prductType, setProductType] = useState("");
    const [shoeType, setShoeType] = useState('');
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);

    const handleSave = () => {
        onSave({ shoeName, shoeType });
        setShoeName('');
        setShoeType('');
    };

    // useEffect(() => {
    //     const getBrands = async () => {
    //       try {
    //         const brandData = await fetchBrands();
    //         setBrands(brandData);
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     };
    
    //     getBrands();
    //     console.log("brands", brands.length)
    //   }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>New Order</h2>
            <form>
                <label>
                    Order Id:
                    <input
                        type="number"
                        value={orderId}
                        onChange={(e) => setOrderID(e.target.value)}
                    />
                </label>
                <label>
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
                </label>
                <label>
                    Shoe Name:
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
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                    />
                </label>
                <div>
                    <h3>Price: ${ }</h3>
                </div>
                <Button onClick={handleSave}>
                    Save
                </Button>
                <Button onClick={onClose || (() => { })}>
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default CreateOrderModal;
