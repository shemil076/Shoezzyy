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
          <p>All island free delivery within 6-10 days.</p>
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
          <h3>Imported from UAE</h3>
          <p>Straight imported from UAE once you place the order.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
