import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchAllShoes } from '../features/shoeSlice';
import '../styles/styles.css'; 
import { Brand } from '../types/enum';
import { categorizeShoesByModel, getReadableBrandName, getReadableModelName, getShoesByBrand, normalizeBrand } from '../utils/helperFunctions';
import SectionDevider from '../components/SectionDevider';
import Carousel from 'react-multi-carousel';
import { responsive } from '../utils/constants';
import ProductCard from '../components/ProductCard';
import { Shoe } from '../types/types';
import ProductDetailModal from '../modals/ProductDetaiModal';

const brandCoverImages: Record<Brand, string> = {
  [Brand.ADIDAS]: '/assets/brandCover.jpg',
  [Brand.ALLSTARCONVERSE]: '/assets/brandCover.jpg',
  [Brand.NEWBALANCE]: '/assets/brandCover.jpg',
  [Brand.NIKE]: '/assets/brandCover.jpg',
  [Brand.VANSOLDSKOOL]: '/assets/brandCover.jpg'
};

const BrandPage: React.FC = () => {
  const { brand: brandParam } = useParams<{ brand?: string }>();
  const brandName = normalizeBrand(brandParam);
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
  const loading = useAppSelector((state) => state.shoes.loading);
  const lastFetched = useAppSelector((state) => state.shoes.lastFetched);
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
  }, [dispatch, shoes.length]);


  if (!brandName) {
    console.error(`Invalid brand: ${brandParam}`);
    return <p>Invalid brand</p>;
  }

  const filteredShoes = getShoesByBrand(shoes,brandName);

  const displayShoesDynamically = () =>{
    switch(brandName){
      case Brand.ALLSTARCONVERSE:
      case Brand.VANSOLDSKOOL:
        return(
          <div className="new-arrival-list">
          <Carousel responsive={responsive}>
            {filteredShoes.map((shoe) => (
              shoe ? (
                <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
              ) : null
            ))}
          </Carousel>
        </div>
        );
      case Brand.ADIDAS:
      case Brand.NEWBALANCE:
      case Brand.NIKE:
        const categoriesWithShoes = categorizeShoesByModel(filteredShoes);
        console.log(categoriesWithShoes)
        return Object.keys(categoriesWithShoes).map((category) =>{
          return(
            <>
            <SectionDevider title={getReadableModelName(brandName,category)} subtitle={''}/>
            <Carousel responsive={responsive}>
            {categoriesWithShoes[category].map((shoe) => (
              shoe ? (
                <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
              ) : null
            ))}
          </Carousel>
            </>
          );
        });

    }
  }


  return (
    <div>

      <div className="cover-container">
        <img 
        src={brandCoverImages[brandName]} 
        alt={`${getReadableBrandName(brandName)} shoes`} 
        className='cover-image' 
      />
        <div className="cover-overlay">
          <h1 className="overlay-text">{getReadableBrandName(brandName)}</h1>
          {/* <p className="overlay-subtext">Discover the Latest Arrivals with</p>
          <h3 className="overlay-subtext-brand-name">Shoe.zzyy</h3> */}

        </div>
      </div>
      

      {/* <SectionDevider title={getReadableBrandName(brandName)?.toUpperCase()} subtitle={''}/> */}

      {displayShoesDynamically()}
      {/* {loading ? <p>Loading...</p> : (
        <ul>
          {filteredShoes.map((shoe) => (
            <li key={shoe.name}>
              <p>{shoe.name}</p>
            </li>
          ))}
        </ul>
      )} */}

{selectedShoe && (
        <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
      )}
    </div>
  );
};

export default BrandPage;
