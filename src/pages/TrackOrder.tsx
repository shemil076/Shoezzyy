import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { selectOrder, selectOrderLoading } from '../selectors/orderSelectors';
// import { fetchOrderStatus } from '../features/orderSlice';

const TrackOrder: React.FC = () => {
  const [jobId, setJobId] = useState('');
  // const dispatch = useAppDispatch<AppDispatch>();
  // const orders = useSelector(selectOrder);
  // const loading = useSelector(selectOrderLoading);
  // const isOrderLastFetched = useSelector(selectOrderLoading);

  const handleTrackOrder = () => {
    // dispatch(fetchOrderStatus(jobId));
  };

  return (
    <div>
      <h1>Track Order</h1>
      <input
        type="text"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        placeholder="Enter Job ID"
      />
      <button onClick={handleTrackOrder}>Track</button>
      {/* {loading ? <p>Loading...</p> : (
        orderStatus && (
          <div>
            <h2>Order Status</h2>
            <p>Job ID: {orderStatus.jobId}</p>
            <p>Shoe: {orderStatus.shoeId.name}</p>
            <p>Status: {orderStatus.status}</p>
            <img src={orderStatus.shoeId.image} alt={orderStatus.shoeId.name} />
          </div>
        )
      )} */}
    </div>
  );
};

export default TrackOrder;
