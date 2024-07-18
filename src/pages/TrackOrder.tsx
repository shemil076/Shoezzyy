import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, selectOrderLoading } from '../selectors/orderSelectors';
import { fetchAllOrders } from '../features/orderSlice';
import { getOrderDetailsByJobId } from '../utils/helperFunctions';
import { Order } from '../types/types';
import "../styles/TrackOrder.css";
import "../styles/RegularButton.css"
import "../styles/styles.css"
import ProgressBar from '../components/ProgressBar';
import OrderNotFoundModal from '../modals/OrderNotFound';

const TrackOrder: React.FC = () => {
  const [jobId, setJobId] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrder);
  const isOrderLastFetched = useSelector(selectOrderLoading);
  const [currentOrder, selectCurrentOrder] = useState<Order>();
  const [isShowOrderNotFound, setIsShowOrderNotFound] = useState(false);

  const openOrderNotFoundModal = () => setIsShowOrderNotFound(true);
  const closeOrderNotFoundModal = () => setIsShowOrderNotFound(false);

  const handleTrackOrder = () => {
    setJobId('');
    if (!currentOrder) {
      openOrderNotFoundModal();
    }
    selectCurrentOrder(getOrderDetailsByJobId(orders, jobId));

  };

  useEffect(() => {
    if (orders.length === 0 || !isOrderLastFetched) {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, orders.length]);


  return (
    <div>

      <div className='cover-container'>
        <img src='/assets/trackOrderCover.jpg' alt='shoes-cover-image' className='cover-image' />
        <div className="cover-overlay">
          <h1 className="overlay-text">Track Your Order</h1>
          <p className="overlay-subtext">with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>

        </div>
      </div>

      <div className="container">

        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Enter Order ID"
          className="inputField"
        />
        < OrderNotFoundModal isOpen={isShowOrderNotFound && !currentOrder?.status} onClose={closeOrderNotFoundModal} />
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