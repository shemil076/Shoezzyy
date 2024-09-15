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
import Carousel from 'react-multi-carousel';
import { responsive } from '../utils/constants';
import { getInstantDeliveries, getOnlyTopPicks } from '../utils/helperFunctions';
import BrandsButtonPanel from '../components/BrandsButtonPanel';
import Maintenance from '../components/Maintenance';
import Slideshow from '../components/Slideshow';

const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const shoes = useSelector(selectShoes);
  const loading = useSelector(selectShoesLoading);
  const lastFetched = useSelector(selectShoesLastFetched);

  const orders = useSelector(selectOrder);
  const isOrderLastFetched = useSelector(selectOrderLastFetched);


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

  const displayConditionalShoes = (isDisplayInstantDeliveries : boolean) => {
    if (loading) return <p>Loading...</p>;

    let filteredShoes : Shoe[];

    isDisplayInstantDeliveries ? filteredShoes = getInstantDeliveries(shoes):filteredShoes = getOnlyTopPicks(shoes);

    
    if (!filteredShoes || filteredShoes.length <= 0) return <p>No shoes available</p>;
    return (
      <div className="new-arrival-list">
        <Carousel responsive={responsive}>
          {filteredShoes.map((shoe) => (
            <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
          ))}
        </Carousel>
      </div>
    );
  };

  const displayNewArrivals = () => {
    if (loading) return <p>Loading...</p>;
    const newArrivalList = shoes.filter((shoe) => (shoe.isInstantDelivery === false)).slice(0, 4);
    
    if (!newArrivalList || newArrivalList.length <= 0) return <p>No shoes available</p>;
    return (
      <div className="new-arrival-list">
        <Carousel responsive={responsive}>
          {newArrivalList.map((shoe, index) => (
            <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
          ))}
        </Carousel>

      </div>
    );

  };


  useEffect(() => {
    if (shoes.length === 0 || !lastFetched) {
      dispatch(fetchAllShoes());
    }
    if (orders.length === 0 || !isOrderLastFetched) {
      dispatch(fetchAllOrders())
    }
  }, [dispatch, shoes.length, orders.length]);

  return (
    <div>
      {/* <Maintenance/> */}
      <div className="cover-container">
        {/* <img src="/assets/homeCover.png" alt="cover" className="cover-image" /> */}

        <Slideshow images={['/assets/homeCover0.jpg','/assets/homeCover2.jpg','/assets/homeCover3.jpg']} height='100vh' transmitionTime={5000} objectFit="fill"/>
        {/* <div className="cover-overlay">
          <h1 className="overlay-text">Featured Products</h1>
          <p className="overlay-subtext">Discover the Latest Arrivals with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>

        </div> */}
      </div>

      <Features />

      <SectionDevider title={"Products by Brands"} subtitle={""} />

      <BrandsButtonPanel />

      <SectionDevider title={"Best Sellers"} subtitle={"Most selling items at the moment"} />
      {/* The below line is not required but don't remove */}
      {shoes.length === 0 ? <p style={{ "textAlign": "center" }}>No products to show...</p> : null}  
      {displayConditionalShoes(false)}

      <SectionDevider title={" Instant Delivery "} subtitle={"Products available in sri lanka"} />
       {/* The below line is not required but don't remove */}
      {shoes.length === 0 ? <p style={{ "textAlign": "center" }}>No products to show...</p> : null}
      {displayConditionalShoes(true)}

      <SectionDevider title={"New Arrivals"} subtitle={'Step into the Latest Trends'} />
       {/* The below line is not required but don't remove */}
      {shoes.length === 0 ? <p style={{ "textAlign": "center" }}>No products to show...</p> : null}
      {displayNewArrivals()}

      {selectedShoe && (
        <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
      )}    </div>
  );
};

export default Home;
