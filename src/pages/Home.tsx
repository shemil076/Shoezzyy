import React, { useEffect } from 'react';
import '../styles/HomePage.css'; 
import '../styles/styles.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectShoes, selectShoesLoading } from '../selectors/shoeSelectors';
import { fetchAllShoes } from '../features/shoeSlice';
import { AppDispatch } from '../store';
import ProductCard from '../components/ProductCard';


const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const shoes = useSelector(selectShoes);
  const loading = useSelector(selectShoesLoading);
  const newArrivalList = shoes.slice(0,5);

  useEffect(() => {
    if (shoes.length === 0) {
      dispatch(fetchAllShoes());
    }
  }, [dispatch, shoes.length]);

  return(
    <div>
      <div>
      <img src="/assets/homeCover.jpg" alt="cover" className="cover-image"/>
      <h1 className='page-name'>New Arrivals</h1>
      {loading ? <p>Loading..</p>: (
        <div className="new-arrival-list">
        {newArrivalList.map((shoe) => (
          <ProductCard shoe={shoe}/>
        ))}
      </div>
      ) }
      </div>
    </div>
  )
};

export default Home;
