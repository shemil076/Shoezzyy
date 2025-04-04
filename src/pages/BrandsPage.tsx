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
  [Brand.ADIDAS]: '/assets/adidasCover.jpeg',
  [Brand.ALLSTARCONVERSE]: '/assets/c.png',
  [Brand.NEWBALANCE]: '/assets/newBalance.png',
  [Brand.NIKE]: '/assets/NIKEE.png',
  [Brand.VANS]: '/assets/vans.png',
  [Brand.OTHER]: '/assets/homeCover1.png'
};

const BrandPage: React.FC = () => {
  const { brand: brandParam } = useParams<{ brand?: string }>();
  const brandName = normalizeBrand(brandParam);
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
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
  }, [dispatch, shoes.length,lastFetched]);


  if (!brandName) {
    console.error(`Invalid brand: ${brandParam}`);
    return <p>Invalid brand</p>;
  }

  const filteredShoes = getShoesByBrand(shoes, brandName).filter((shoe)=> !shoe.isInstantDelivery);

  const displayShoesDynamically = () => {
    if (!Array.isArray(filteredShoes) || filteredShoes.length === 0) {
      return <p>No shoes available</p>;
    }
    switch (brandName) {
      case Brand.ALLSTARCONVERSE:
      
        return (
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
      case Brand.VANS:
      case Brand.OTHER:
        const categoriesWithShoes = categorizeShoesByModel(filteredShoes);
        return Object.keys(categoriesWithShoes).map((category,index) => {
          return (
            <React.Fragment key={category}>
              <SectionDevider title={getReadableModelName(brandName, category)} subtitle={''}  />
              <Carousel responsive={responsive}>
                {categoriesWithShoes[category].map((shoe) => (
                  shoe ? (
                    <ProductCard key={shoe._id} shoe={shoe} onCardClick={openProductDetailModal} />
                  ) : null
                ))}
              </Carousel>
            </React.Fragment>
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
        {/* <div className="cover-overlay">
          <h1 className="overlay-text">{getReadableBrandName(brandName)}</h1>

        </div> */}
      </div>

      {displayShoesDynamically()}

      {selectedShoe && (
        <ProductDetailModal isOpen={isProductDetailOpen} shoe={selectedShoe} onClose={closeProductDetailModal} />
      )}
    </div>
  );
};

export default BrandPage;
