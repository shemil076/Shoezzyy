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
          <p>We cover the import and local delivery charges for you.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/quality.png" alt="Genuine Products" />
        </div>
        <div className="feature-text">
          <h3>Quality Guaranteed</h3>
          <p>We guarantee you the quality.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-icon">
          <img src="/assets/return.png" alt="Free Returns" />
        </div>
        <div className="feature-text">
          <h3>Imported from UAE</h3>
          <p>Directly Imported from UAE within 6-10 business days.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
