import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Brands from './pages/BrandsPage';
import TrackOrder from './pages/TrackOrder';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:brand" element={<Brands />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
