import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css'; 
import '../styles/styles.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectShoes, selectShoesLastFetched, selectShoesLoading } from '../selectors/shoeSelectors';
import { fetchAllShoes } from '../features/shoeSlice';
import { AppDispatch } from '../store';
import ProductCard from '../components/ProductCard';
import { selectOrder, selectOrderLastFetched, selectOrderLoading } from '../selectors/orderSelectors';
import { fetchAllOrders } from '../features/orderSlice';
import { Shoe } from '../types/types';
import ProductDetailModal from '../modals/ProductDetaiModal';
import Features from '../components/Features';
import SectionDevider from '../components/SectionDevider';

const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const shoes = useSelector(selectShoes);
  const loading = useSelector(selectShoesLoading);
  const lastFetched = useSelector(selectShoesLastFetched);

  const orders = useSelector(selectOrder);
  const isOrderloading = useSelector(selectOrderLoading);
  const isOrderLastFetched = useSelector(selectOrderLastFetched);
  const newArrivalList = shoes.slice(0,4);

  const [isProductDetailOpen, setProductDetailOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);

  const openProductDetailModal = (shoe: Shoe) => {
    setSelectedShoe(shoe);
    setProductDetailOpen(true);
};

const closeProductDetailModal = () => {
    setProductDetailOpen(false);
    setSelectedShoe(null);
};


  useEffect(() => {
    if (shoes.length === 0 ||!lastFetched) {
      dispatch(fetchAllShoes());
    }
    if(orders.length === 0 || !isOrderLastFetched){
      dispatch(fetchAllOrders())
    }
  }, [dispatch, shoes.length, orders.length]);

  return (
    <div>
      <div className="cover-container">
        <img src="/assets/homeCover.jpg" alt="cover" className="cover-image" />
        <div className="cover-overlay">
          <h1 className="overlay-text" style={{"fontSize": "3.5rem"}}>Featured Products</h1>
          <p className="overlay-subtext">Discover the Latest Arrivals with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>

        </div>
      </div>

      <Features/>
      <SectionDevider title={"New Arrivals"} subtitle={'Step into the Latest Trends'}/>

      {shoes.length === 0 ? <p style={{"textAlign": "center"}}>No products to show...</p> : null}
      {loading ? <p>Loading..</p> : (
        <div className="new-arrival-list">
          {newArrivalList.map((shoe, index) => (
             <ProductCard key={index} shoe={shoe} onCardClick={openProductDetailModal} />
          ))}
        </div>
      )}

      {selectedShoe && (
                <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
            )}
    </div>
  );
};

export default Home;
