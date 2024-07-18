import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoes, selectShoesLastFetched, selectShoesLoading } from "../selectors/shoeSelectors";
import ProductCard from "../components/ProductCard";
import '../styles/ProductPage.css';
import { AppDispatch } from "../store";
import { fetchAllShoes } from "../features/shoeSlice";
import { getOnlyTopPicks, getReadableBrandName, getShoesByBrand } from "../utils/helperFunctions";
import { Shoe } from "../types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetailModal from "../modals/ProductDetaiModal";
import { Brand } from "../types/enum";
import SubNavBar from "../components/SubNavBar";
import SectionDevider from "../components/SectionDevider";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from "../utils/constants";

const ProductPage: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // const shoes = useSelector(selectShoes);
  // const loading = useSelector(selectShoesLoading);
  // const lastFetched = useSelector(selectShoesLastFetched);
  // const [isProductDetailOpen, setProductDetailOpen] = useState(false);
  // const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(null);
  // const [currentSelection, setCurrentSelection] = useState<Brand | string>("topPicks");

 

  // const displayOnlyTopPicks = () => {
  //   if (loading) return <p>Loading...</p>;

  //   const filteredShoes = getOnlyTopPicks(shoes);

  //   if (!filteredShoes) return null;
  //   return (
  //     <div className="new-arrival-list">
  //       <Carousel responsive={responsive}>
  //     {filteredShoes.map((shoe) => (
  //         shoe.isATopPick ? (
  //           <ProductCard key={`${shoe._id}-${currentSelection}`} shoe={shoe} onCardClick={openProductDetailModal} />
  //         ) : null
  //       ))}
  //     </Carousel>
  //     </div> 
  //   );
  // };

  // const displayProducts = () =>{
  //   if (loading) return <p>Loading...</p>;

  //   if( currentSelection !== 'topPicks'){
  //    const filteredShoes = getShoesByBrand(shoes, currentSelection);
  //     if(filteredShoes.length > 0){
  //       return (
  //         <div className="new-arrival-list">
  //         {filteredShoes.map((shoe) => (
  //           <ProductCard key={`${shoe._id}-${currentSelection}`} shoe={shoe} onCardClick={openProductDetailModal} />
  //         ))}
  //       </div>
  //       );
  //     }
  //     return <p style={{"textAlign": "center"}}>No items</p>
  //   }
  

  //   return null;
  // };

  // const openProductDetailModal = (shoe: Shoe) => {
  //   setSelectedShoe(shoe);
  //   setProductDetailOpen(true);
  // };

  // const closeProductDetailModal = () => {
  //   setProductDetailOpen(false);
  //   setSelectedShoe(null);
  // };


  // useEffect(() => {
  //   if (shoes.length === 0 || !lastFetched) {
  //     dispatch(fetchAllShoes());
  //   }
  // }, [dispatch, shoes.length, lastFetched]);

  return (
    <div>
      <div className="cover-container">
      <img src='/assets/productCover.jpg' alt='shoes-cover-image' className='cover-image' />
      <div className="cover-overlay">
        <h1 className="overlay-text">Available Products</h1>
        <p className="overlay-subtext">on</p>
        <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>
      </div>
      </div>
      <SubNavBar/>

      {/* {currentSelection === 'topPicks' ? (
        <>
        <SectionDevider title={"Top Picks"} subtitle={"Handpicked Favorites Just for You."}/>
        {displayOnlyTopPicks()}
        </>
      ): null} */}


      {/* {currentSelection !== 'topPicks' ? (
       <>
       <SectionDevider title={getReadableBrandName(currentSelection as Brand)} subtitle={""} />
        {displayProducts()}</>
      ) : null}

      {selectedShoe && (
        <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
      )} */}
    </div>
  );
};

export default ProductPage;

