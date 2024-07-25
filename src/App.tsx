import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrackOrder from './pages/TrackOrder';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import { PersistGate } from 'redux-persist/integration/react';
import BrandPage from './pages/BrandsPage';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/brand/:brand" element={<BrandPage />} />
        </Routes>
      </Router>
      <Footer/>
      </PersistGate>
    </Provider>
  );
};

export default App;
