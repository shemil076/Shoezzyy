import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchShoes } from '../features/shoeSlice';
import '../styles/styles.css';
import { Brand } from '../types/enum';
import { getReadableBrandName } from '../utils/helperFunctions';

const brandCoverImages: Record<Brand, string> = {
  [Brand.Adidas]: '/assets/mensShoes.jpg',
  [Brand.AllStarConverse]: '/assets/womenshoes.jpg',
  [Brand.NewBalance]: '/assets/kidsShoes.jpg',
  [Brand.Nike]: '',
  [Brand.VansOldSkool]: ''
};
;


const BrandsPage: React.FC = () => {
  const { brand: brandParam } = useParams<{ brand: string }>();
  const brandName = brandParam as Brand;
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
  const loading = useAppSelector((state) => state.shoes.loading);

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
        <ul>
          {shoes.map((shoe) => (
            <li key={shoe.name}>
              <img src={shoe.image} alt={shoe.name} />
              <p>{shoe.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandsPage;
