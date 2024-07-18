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
        onClick={() => navigate('/brand/ADIDAS')}
      >
        <h2>{getReadableBrandName(Brand.ADIDAS)}</h2>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.ADIDAS)} />
      </div>
      <div
        className="sub-nav-item"
        onClick={() => navigate('/brand/ALLSTARCONVERSE')}
      >
        <h2>{getReadableBrandName(Brand.ALLSTARCONVERSE)}</h2>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.ALLSTARCONVERSE)} />
      </div>
      <div
        className="sub-nav-item"
        onClick={() => navigate('/brand/NEWBALANCE')}
      >
        <h2>{getReadableBrandName(Brand.NEWBALANCE)}</h2>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.NEWBALANCE)} />
      </div>
      <div
        className="sub-nav-item"
        onClick={() => navigate('/brand/NIKE')}
      >
        <h2>{getReadableBrandName(Brand.NIKE)}</h2>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.NIKE)} />
      </div>
      <div
        className="sub-nav-item"
        onClick={() => navigate('/brand/VANSOLDSKOOL')}
      >
        <h2>{getReadableBrandName(Brand.VANSOLDSKOOL)}</h2>
        <Slideshow images={getImagesForSlideShow(shoes, Brand.VANSOLDSKOOL)} />
      </div>
    </div>
  );
};

export default SubNavBar;
