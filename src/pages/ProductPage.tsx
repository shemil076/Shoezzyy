import React, { useEffect, useState } from "react";
import SubNavBar from "../components/SubNavBar";
import '../styles/ProductPage.css';
import 'react-multi-carousel/lib/styles.css';
import BrandsButtonPanel from "../components/BrandsButtonPanel";
import { Shoe } from "../types/types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchAllShoes } from "../features/shoeSlice";
import { shuffleArray } from "../utils/helperFunctions";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../modals/ProductDetaiModal";


const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
  const lastFetched = useAppSelector((state) => state.shoes.lastFetched);
  const [shuffledShoes, setShuffledShoes] = useState<Shoe[]>([]);

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
    if (shoes.length === 0 || !lastFetched) {
      dispatch(fetchAllShoes());
    }
  }, [dispatch, shoes.length,lastFetched]);

  useEffect(() => {
    setShuffledShoes(shuffleArray(shoes));
  }, [shoes]);

  const displayAllProducts = () =>{
    if(!shuffledShoes) return "No shoes";
    return(
      <div className="product-grid">
        {shuffledShoes.filter((shoes) => !shoes.isInstantDelivery).map((shoe, index)=>(
          <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="cover-container">
        <img src='/assets/homeCover1.png' alt='shoes-cover-image' className='cover-image' />
        {/* <div className="cover-overlay">
          <h1 className="overlay-text">Available Products</h1>
          <p className="overlay-subtext">on</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>
        </div> */}
      </div>
      <BrandsButtonPanel />

      {displayAllProducts()}

      {/* <SubNavBar /> */}
      {selectedShoe && (
        <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
      )}
    </div>
  );
};

export default ProductPage;

