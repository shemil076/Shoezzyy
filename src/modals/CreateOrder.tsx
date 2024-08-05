import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import '../styles/AddNewProduct.css';
import '../styles/CreateOrder.css';
import '../styles/RegularButton.css'
import { Brand, OrderStatus } from '../types/enum';
import Button from '../components/Button';
import { Shoe } from '../types/types';
import { categorizeShoesByBrand, getReadableBrandName, getReadableModelName } from '../utils/helperFunctions';
import { fetchAllOrders } from '../features/orderSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';


interface CreateOrderModalProps {
    isOpen: boolean;
    onClose: () => void;

    shoes: Shoe[];
}

const getShoeDataByName = (shoeName: string ,  shoes : Shoe[]):Shoe | undefined=>{
    const filteredShoes = shoes.filter((shoe)=>(shoe.name === shoeName));

    return filteredShoes.length > 0 ? filteredShoes[0] : undefined;
};

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, shoes }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [orderId, setOrderID] = useState('');
    const [shoeName, setShoeName] = useState('');
    const [shoeBrand, setShoeBrand] = useState('');
    const [quantity, setQuantity] = useState(0);
    const categorizedShoes = categorizeShoesByBrand(shoes);
    const [cost, setCost] = useState(0);
    const [selectedShoe, setSelectedShoe] = useState<Shoe>();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(()=>{
        setIsFormValid(orderId !== '' && shoeName !== ''&& shoeBrand !== '' && quantity > 0 && cost > 0);
    },[orderId,shoeName,shoeBrand,quantity,cost]);

    const handleSave = async () => {
        if (!isFormValid) return;

        const orderData = {
            jobId : orderId,
            shoeId : selectedShoe?._id,
            shoeBrand,
            shoeName,
            quantity,
            cost,
            status: OrderStatus.NEW
        };

        try {
            const response = await fetch('/api/orders', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(orderData)
            })
            if(response.ok){
                dispatch(fetchAllOrders())
                handleClose();
            }else{
                console.error('Error saving order');
            }
        }catch(error){
            console.error('Error saving order', error);
        }
    };


    const handleClose = () => {
        onClose();
        setOrderID('');
        setShoeName('');
        setShoeBrand('');
        setSelectedShoe(undefined);
        setQuantity(0);
    };


    const returnBrandOptions = () => {
        return Object.keys(categorizedShoes).map((brand, index)=>{
            return(
                <option key={index} value={brand}>{getReadableBrandName(brand as Brand)}</option>
            );
        });
    };

    const returnShoeOptions = () => {
        const relatedProducts = categorizedShoes[shoeBrand];
        if (!relatedProducts) return null;
        return relatedProducts.map((shoe, index)=>{
            const optionText = shoe.model ? getReadableModelName(shoe.brand,shoe.model) + " " + shoe.name : shoe.name
            return (
                <option key={index} value={shoe.name}>{optionText}</option>
            );
        });
    };

    const calculateCost = useCallback(() => {
        if(selectedShoe?.offerPrice){
            setCost(selectedShoe && quantity ? selectedShoe?.offerPrice * quantity : 0) 
        }else{
            setCost(selectedShoe && quantity ? selectedShoe?.actualPrice * quantity : 0) 
        }
       
    },[selectedShoe,quantity]); 
    

    useEffect(()=>{
        setSelectedShoe(getShoeDataByName(shoeName, shoes));
    },[shoeName,shoes]);

    useEffect(()=>{
        calculateCost();
    },[calculateCost]);


  
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>New Order</h2>
            <form>
                <label>
                    Order Id:
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderID(e.target.value)}
                    />
                </label>
                <label>
                    Shoe Brand:
                    <select
                        value={shoeBrand}
                        onChange={(e) => setShoeBrand(e.target.value as Brand)}
                    >
                        <option value="">Select a brand</option>
                        {returnBrandOptions()}
                    </select>
                </label>
                <label>
                    Shoe Name:
                    <select
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                    >
                        <option value="">Select a brand</option>
                        {returnShoeOptions()}
                    </select>
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const value = Math.max(0, Number(e.target.value));
                            setQuantity(value as unknown as number)
                        }}
                    />
                </label>
                <div>
                    <h3>Price: LKR. {cost}</h3>
                </div>
                <div className='creat-order-button-section'>
                <Button onClick={onClose || (() => { })} className='regular-black-button'>
                    Cancel
                </Button>
                <Button onClick={handleSave} isDisabled={!isFormValid} className='regular-black-button'>
                    Save
                </Button>
                </div>
                
            </form>
        </Modal>
    );
};

export default CreateOrderModal;
