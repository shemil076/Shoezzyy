import React, { useEffect } from 'react';
import '../styles/HomePage.css'; 
import '../styles/styles.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectShoes, selectShoesLastFetched, selectShoesLoading } from '../selectors/shoeSelectors';
import { fetchAllShoes } from '../features/shoeSlice';
import { AppDispatch } from '../store';
import ProductCard from '../components/ProductCard';
import { selectOrder, selectOrderLastFetched, selectOrderLoading } from '../selectors/orderSelectors';
import { fetchAllOrders } from '../features/orderSlice';

const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const shoes = useSelector(selectShoes);
  const loading = useSelector(selectShoesLoading);
  const lastFetched = useSelector(selectShoesLastFetched);

  const orders = useSelector(selectOrder);
  const isOrderloading = useSelector(selectOrderLoading);
  const isOrderLastFetched = useSelector(selectOrderLastFetched);
  const newArrivalList = shoes.slice(0,4);

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
          <h1 className="overlay-text">New Arrivals</h1>
          <p className="overlay-subtext">Discover the Latest Arrivals with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>

        </div>
      </div>
      {loading ? <p>Loading..</p> : (
        <div className="new-arrival-list">
          {newArrivalList.map((shoe, index) => (
            <ProductCard key={index} shoe={shoe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
