// ProductPage.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShoes, selectShoesLastFetched, selectShoesLoading } from "../selectors/shoeSelectors";
import ProductCard from "../components/ProductCard";
import '../styles/ProductPage.css'
import '../styles/styles.css'
import { AppDispatch } from "../store";
import { fetchAllShoes } from "../features/shoeSlice";
import { categorizeShoesByBrand } from "../utils/helperFunctions";
import { Shoe } from "../types/types";

const ProductPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const shoes = useSelector(selectShoes);
    const loading = useSelector(selectShoesLoading);
    const lastFetched = useSelector(selectShoesLastFetched);
    const categorizedShoes = categorizeShoesByBrand(shoes);

    useEffect(() => {
        if (shoes.length === 0 || !lastFetched) {
            dispatch(fetchAllShoes());
        }
    }, [dispatch, shoes.length]);

    const displaySections = () => {
        if (loading) return <p>Loading...</p>;

        return Object.keys(categorizedShoes).map((brand) => {
            const products = categorizedShoes[brand];
            const shouldScroll = products.length > 4;

            return (
                <div key={brand} className="brand-section">
                    <h2 className="section-name">{brand}</h2>
                    <div className={`product-list ${shouldScroll ? 'scrollable' : ''}`}>
                        {products.map((shoe: Shoe) => (
                            <ProductCard shoe={shoe} />
                        ))}
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <img src='/assets/womenshoes.jpg' alt='shoes-cover-image' className='cover-image' />
            <h1 className="page-name">Products</h1>
            <div className="product-page">
                {displaySections()}
            </div>
        </div>
    );
};

export default ProductPage;
