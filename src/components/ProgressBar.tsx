import React from 'react';
import { OrderStatus } from '../types/enum';
import '../styles/ProgressBar.css';

interface ProgressBarProps {
  currentStatus?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus }) => {
  const statusSteps = [
    { label: 'New Order', icon: '/assets/new.png', status: OrderStatus.NEW },
    { label: 'Importing', icon: '/assets/importing.png', status: OrderStatus.IMPORTING },
    { label: 'Arrived', icon: '/assets/arrived.png', status: OrderStatus.ARRIVED },
    { label: 'Delivered', icon: '/assets/delivered.png', status: OrderStatus.DELIVERED },
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
          {index < statusSteps.length  && <div className="line"></div>}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
