import React from 'react';
import '../styles/HomePage.css'; 
import '../styles/styles.css'; 


const Home: React.FC = () => {
  return(
    <div>
      <div>
      <img src="/assets/homeCover.jpg" alt="cover" className="cover-image"/>
      <h1 className='section-name'>Featured Products</h1>
      </div>
    </div>
  )
};

export default Home;
