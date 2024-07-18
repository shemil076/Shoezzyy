import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { OrderStatus } from '../types/enum';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectOrder, selectOrderLastFetched, selectOrderLoading } from '../selectors/orderSelectors';
import { fetchAllOrders } from '../features/orderSlice';
import { Order } from '../types/types';
import '../styles/AddNewProduct.css';
import '../styles/UpdateOrderStatus.css';
import '../styles/RegularButton.css'
import { getOrderDetailsByJobId } from '../utils/helperFunctions';


interface CreateOrderProps {
    isOpen: boolean;
    onClose?: () => void;
}

const UpdateOrderStatusModal: React.FC<CreateOrderProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector(selectOrder);
    const loading = useSelector(selectOrderLoading);
    const lastFetched = useSelector(selectOrderLastFetched);

    const [jobId, setJobId] = useState('');
    const [currenOrder, setCurrentOrder] = useState<Order>();
    const [orderStatus, setOrderStatus] = useState<OrderStatus>();


    const handleSave = async () => {
        const updatedStatus = {
            _id: currenOrder?._id,
            status: orderStatus,
        };

        try {
            const response = await fetch('/api/orders/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStatus)
            });

            if (!response.ok) {
                <p>Error updating</p>
            }
        } catch (error) {
            console.error('Error updating status', error);
        }
    };


    useEffect(() => {
        if (orders.length === 0 || !lastFetched) {
            dispatch(fetchAllOrders())
        }
    }, [dispatch, orders.length]);


    useEffect(() => {
        setCurrentOrder(getOrderDetailsByJobId(orders, jobId));
        setOrderStatus(currenOrder?.status)
    }, [jobId]);

    const jobIdOptions = () => {
        return orders.map((order, index) => {
            return (
                <option key={index} value={order.jobId}>{order.jobId}</option>

            );
        });
    }
    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="modal-overlay-custom"
            contentClassName="modal-content-custom"
        >
            <h2>Update Order Status</h2>
            {loading ? <p>Loading...</p> : <form>
                <label>
                    Order Id:
                    <select
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                    >
                        <option value=''>Select the order id</option>
                        {jobIdOptions()}
                    </select>
                </label>
                <label>
                    Next Order Status:
                    <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
                    >
                        <option value={OrderStatus.NEW}>New</option>
                        <option value={OrderStatus.IMPORTING}>Importing</option>
                        <option value={OrderStatus.ARRIVED}>Arrived</option>
                        <option value={OrderStatus.DELIVERED}>Delivered</option>
                    </select>
                </label>
                <div className='button-section'>

                    <Button onClick={onClose || (() => { })} className='regular-black-button'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className='regular-black-button'>
                        Save
                    </Button>
                </div>
            </form>}
        </Modal>

    );
};

export default UpdateOrderStatusModal;
