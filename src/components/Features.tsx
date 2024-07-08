import React from 'react';
import '../styles/Features.css';

const Features: React.FC = () => {
  return (
    <div className="features-container">
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/delivery.png" alt="Fast Shipping" />
        </div>
        <div className="feature-text">
          <h3>Free Shipping</h3>
          <p>Island wide free delivery.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/quality.png" alt="Genuine Products" />
        </div>
        <div className="feature-text">
          <h3>Quality Guaranteed</h3>
          <p>All products are made from 100% Quality materials.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/return.png" alt="Free Returns" />
        </div>
        <div className="feature-text">
          <h3>Hassle free return policy</h3>
          <p>If it doesn’t fit, return and get a new one.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/doorstep.png" alt="Free Returns" />
        </div>
        <div className="feature-text">
          <h3>Fast Shipping</h3>
          <p>Delivered to your doorstep within 6-10 business days.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
