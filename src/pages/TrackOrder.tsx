import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, selectOrderLoading } from '../selectors/orderSelectors';
import { fetchAllOrders } from '../features/orderSlice';
import { getOrderDetailsByJobId } from '../utils/helperFunctions';
import { Order } from '../types/types';
import  "../styles/TrackOrder.css";
import { OrderStatus } from '../types/enum';
import "../styles/RegularButton.css"
import "../styles/styles.css"
import OrderTracker from '../components/ProgressBar';
import ProgressBar from '../components/ProgressBar';
import OrderNotFoundModal from '../modals/OrderNotFound';

const TrackOrder: React.FC = () => {
  const [jobId, setJobId] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrder);
  const loading = useSelector(selectOrderLoading);
  const isOrderLastFetched = useSelector(selectOrderLoading);
  const [currentOrder, selectCurrentOrder] = useState<Order>();
  const [isShowOrderNotFound, setIsShowOrderNotFound] = useState(false);

  const openOrderNotFoundModal = () => setIsShowOrderNotFound(true);
  const closeOrderNotFoundModal = () => setIsShowOrderNotFound(false);

  const handleTrackOrder = () => {
    setJobId('');
    if(!currentOrder){
      openOrderNotFoundModal();
    }
    selectCurrentOrder(getOrderDetailsByJobId(orders, jobId));

  };

  useEffect(() => {
    if (orders.length === 0 || !isOrderLastFetched) {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, orders.length]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case OrderStatus.NEW:
        return 'progress new';
      case OrderStatus.IMPORTING:
        return 'progress importing';
      case OrderStatus.ARRIVED:
        return 'progress arrived';
        case OrderStatus.DELIVERED:
        return 'progress delivered';
      default:
        return 'progress';
    }
  };

  return (
    <div>
                  <img src='/assets/trackOrderCover.jpg' alt='shoes-cover-image' className='cover-image' />

      <div className="container">
      <div className="cover-overlay">
          <h1 className="overlay-text" style={{"fontSize": "4rem"}}>Track Your Order</h1>
          <p className="overlay-subtext">with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>

        </div>
      <input
        type="text"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        placeholder="Enter Job ID"
        className="inputField"
      />
     < OrderNotFoundModal isOpen={isShowOrderNotFound && !currentOrder?.status} onClose={closeOrderNotFoundModal}/>
      <button onClick={handleTrackOrder} className="regular-black-button">Track</button>
      {currentOrder?.status ? 
      <>
      <h1>Job Id: {currentOrder.jobId}</h1>
      <ProgressBar currentStatus={currentOrder?.status} /> 
      </>
      : null}
    </div>
    
    </div>
  );
};

export default TrackOrder;