import React, { useEffect } from "react";
import { Brand } from "../types/enum";
import "../styles/SubNavBar.css";
import { categorizeShoesByModel, getReadableBrandName, getShoesByBrand } from "../utils/helperFunctions";
import { useNavigate } from 'react-router-dom';
import Slideshow from "./Slideshow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { selectShoes, selectShoesLastFetched } from "../selectors/shoeSelectors";
import { fetchAllShoes } from "../features/shoeSlice";
import { Shoe } from "../types/types";
import Button from "./Button";
import "../styles/RegularButton.css";

const getImagesForSlideShow = (shoes: Shoe[], brand: Brand): string[] => {
  const shoesFiltterdByBrands = getShoesByBrand(shoes, brand);
  let imagesArray: string[] = [];
  switch (brand) {
    case Brand.ADIDAS:
    case Brand.NEWBALANCE:
    case Brand.NIKE:
      const shoesByModels = categorizeShoesByModel(shoesFiltterdByBrands);
      Object.values(shoesByModels).map((shoe) => {
        imagesArray.push(shoe[0].images[0]);
      });
      return imagesArray;
    default:
      shoesFiltterdByBrands.map((shoe) => {
        imagesArray.push(shoe.images[0]);
      });
      return imagesArray;
  }
};

const SubNavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const shoes = useSelector(selectShoes);
  const lastFetched = useSelector(selectShoesLastFetched);

  useEffect(() => {
    if (shoes.length === 0 || !lastFetched) {
      dispatch(fetchAllShoes());
    }
  }, [dispatch, shoes.length, lastFetched]);

  return (
    <div className="sub-nav-container">
      <div
        className="sub-nav-item"
      >
        <h1>{getReadableBrandName(Brand.ADIDAS)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.ADIDAS)} />
        <Button className='regular-black-button view-more-button' onClick={() => navigate('/brand/ADIDAS')}>View More</Button>
      </div>
      <div
        className="sub-nav-item"
        
      >
        <h1>{getReadableBrandName(Brand.ALLSTARCONVERSE)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.ALLSTARCONVERSE)} />
        <Button className='regular-black-button view-more-button' onClick={() => navigate('/brand/ALLSTARCONVERSE')}>View More</Button>
      </div>
      <div
        className="sub-nav-item"
        
      >
        <h1>{getReadableBrandName(Brand.NEWBALANCE)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.NEWBALANCE)} />
        <Button className='regular-black-button view-more-button' onClick={() => navigate('/brand/NEWBALANCE')}>View More</Button>
      </div>
      <div
        className="sub-nav-item"
        
      >
        <h1>{getReadableBrandName(Brand.NIKE)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.NIKE)} />
        <Button className='regular-black-button view-more-button' onClick={() => navigate('/brand/NIKE')}>View More</Button>
      </div>
      <div
        className="sub-nav-item"
       
      >
        <h1>{getReadableBrandName(Brand.VANS)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.VANS)} />
        <Button className='regular-black-button view-more-button'  onClick={() => navigate('/brand/VANS')}>View More</Button>
      </div>
      <div
        className="sub-nav-item"
       
      >
        <h1>{getReadableBrandName(Brand.OTHER)}</h1>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.OTHER)} />
        <Button className='regular-black-button view-more-button'  onClick={() => navigate('/brand/OTHER')}>View More</Button>
      </div>
    </div>
  );
};

export default SubNavBar;
