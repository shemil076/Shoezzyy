// ProductPage.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoes, selectShoesLastFetched, selectShoesLoading } from "../selectors/shoeSelectors";
import ProductCard from "../components/ProductCard";
import '../styles/ProductPage.css';
import { AppDispatch } from "../store";
import { fetchAllShoes } from "../features/shoeSlice";
import { categorizeShoesByBrand } from "../utils/helperFunctions";
import { Shoe } from "../types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductDetailModal from "../modals/ProductDetaiModal";

const ProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const shoes = useSelector(selectShoes);
    const loading = useSelector(selectShoesLoading);
    const lastFetched = useSelector(selectShoesLastFetched);
    const categorizedShoes = categorizeShoesByBrand(shoes);
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


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
};


    useEffect(() => {
        if (shoes.length === 0 || !lastFetched) {
            dispatch(fetchAllShoes());
        }
    }, [dispatch, shoes.length, lastFetched]);

    const displaySections = () => {
        if (loading) return <p>Loading...</p>;

        return Object.keys(categorizedShoes).map((brand) => {
            const products = categorizedShoes[brand];
            return (
                <div key={brand} className="brand-section">
                    <h2 className="section-name">{brand}</h2>
                    <Slider {...settings}>
                    {products.map((shoe: Shoe, index) => (
                            <ProductCard key={index} shoe={shoe} onCardClick={openProductDetailModal} />
                        ))}
                    </Slider>
                </div>
            );
        });
    };

    return (
        <div>
            <img src='/assets/productCover.jpg' alt='shoes-cover-image' className='cover-image' />
            <div className="cover-overlay">
                <h1 className="overlay-text" style={{"fontSize": "3.5rem"}}>Available Products</h1>
                <p className="overlay-subtext">on</p>
                <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3>
            </div>
            <div className="product-page">
                {displaySections()}
            </div>
            {selectedShoe && (
                <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
            )}
        </div>
    );
};

export default ProductPage;
