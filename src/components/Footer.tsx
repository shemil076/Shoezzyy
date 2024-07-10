import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/assets/shoezzyylogo.png" alt="" className='footer-logo' />
        <p>&copy; 2024 Shoe.zzyy. All rights reserved.</p>
        <div className='footer-contacts'>
        <a href="https://wa.me/94776995453">
          <img src="/assets/whatsapp.png" alt="" className='footer-contats-img' />
        </a>
        <a href="https://www.instagram.com/shoe.zzyy/">
          <img src="/assets/instagram.png" alt="" className='footer-contats-img'/>
        </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
