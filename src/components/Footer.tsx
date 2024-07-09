import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/assets/shoezzyylogo.png" alt="" className='footer-logo' />
        <p>&copy; 2024 Shoe.zzyy. All rights reserved.</p>
        {/* <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul> */}
        <div className='footer-contacts'>
        <a href="#">
          <img src="/assets/whatsapp.png" alt="" className='footer-contats-img' />
        </a>
        <a href="#">
          <img src="/assets/instagram.png" alt="" className='footer-contats-img'/>
        </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
