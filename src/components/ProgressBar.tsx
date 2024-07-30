import React from 'react';
import { OrderStatus } from '../types/enum';
import '../styles/ProgressBar.css';

interface ProgressBarProps {
  currentStatus?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus }) => {
  const statusSteps = [
    { label: 'New Order', icon: '/assets/new.png', status: OrderStatus.NEW },
    { label: 'Dealer Confirmed', icon: '/assets/dealerConfirmed.png', status: OrderStatus.DEALERCONFIRMED },
    { label: 'Order Processing', icon: '/assets/orderProcessing.png', status: OrderStatus.ORDERPROCESSING },
    { label: 'Recieved In UAE', icon: '/assets/recievedInUae.png', status: OrderStatus.RECIEVEDINUAE },

    { label: 'In Transit To SL', icon: '/assets/inTransitToSL.png', status: OrderStatus.INTRANSITTOSL },
    { label: 'Arrived In SL', icon: '/assets/arrivedInSL.png', status: OrderStatus.ARRIVEDINSL },
    { label: 'Dispatched', icon: '/assets/dispatched.png', status: OrderStatus.DISPATCHED },
  ];

  const getStepClass = (status: string) => {
    if (!currentStatus) return '';
    const currentIndex = statusSteps.findIndex(step => step.status === currentStatus);
    const stepIndex = statusSteps.findIndex(step => step.status === status);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return '';
  };

  return (
    <div className="progress-bar">
      {statusSteps.map((step, index) => (
        <div key={step.status} className={`progress-step ${getStepClass(step.status)}`}>
          <div className="label-container">
            <img src={step.icon} alt={step.label} className="status-icon" />
            <div className="label">{step.label}</div>
          </div>
          {index < statusSteps.length && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
