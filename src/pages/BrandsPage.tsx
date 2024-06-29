import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchShoes } from '../features/shoeSlice';
import '../styles/styles.css';
import '../styles/BrandsPage.css'
import { Brand } from '../types/enum';
import { getReadableBrandName } from '../utils/helperFunctions';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../modals/ProductDetaiModal';

const brandCoverImages: Record<Brand, string> = {
  [Brand.ADIDAS]: '/assets/mensShoes.jpg',
  [Brand.ALLSTARCONVERSE]: '/assets/womenshoes.jpg',
  [Brand.NEWBALANCE]: '/assets/kidsShoes.jpg',
  [Brand.NIKE]: '',
  [Brand.VANSOLDSKOOL]: ''
};

const BrandsPage: React.FC = () => {
  const { brand: brandParam } = useParams<{ brand: string }>();
  const brandName = brandParam as Brand;
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
  const loading = useAppSelector((state) => state.shoes.loading);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const openProductDetailModal = () => setIsProductDetailOpen(true);
  const closeProductDetailModal = () => setIsProductDetailOpen(false);
  useEffect(() => {
    if (brandName) {
      dispatch(fetchShoes(brandName));
    }
  }, [brandName, dispatch]);



  return (
    <div>
      <img src={brandCoverImages[brandName]} alt={`${getReadableBrandName(brandName)} shoes`} className='cover-image' />
      <h1 className='section-name'>{getReadableBrandName(brandName)?.toUpperCase()} Shoes</h1>
      {loading ? <p>Loading...</p> : (
        <div className="product-list">
          {shoes.map((shoe) => (
            <>
            <ProductCard shoe={shoe} onClick={openProductDetailModal}/>
            
            < ProductDetailModal isOpen={isProductDetailOpen} shoe={shoe}  onClose={closeProductDetailModal}/>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
