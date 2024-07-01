import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrackOrder from './pages/TrackOrder';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-page" element={<ProductPage />} />
          {/* <Route path="/:brand" element={<Brands />} /> */}
          <Route path="/track-order" element={<TrackOrder />} />
        
        </Routes>
      </Router>
      <Footer/>
    </Provider>
  );
};

export default App;
