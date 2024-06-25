import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchShoes } from '../features/shoeSlice';
import '../styles/styles.css'; 


// Define a mapping of category names to cover images
const categoryCoverImages: Record<string, string> = {
  men: '/assets/mensShoes.jpg',
  women: '/assets/womenshoes.jpg',
  kids: '/assets/kidsShoes.jpg',
};

const Category: React.FC = () => {
  const { category: categoryName = 'men' } = useParams<{ category?: string }>();
  const dispatch = useAppDispatch();
  const shoes = useAppSelector((state) => state.shoes.shoes);
  const loading = useAppSelector((state) => state.shoes.loading);

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchShoes(categoryName));
    }
  }, [categoryName, dispatch]);

  return (
    <div>
      {/* Use the category name to dynamically retrieve the cover image */}
      <img src={categoryCoverImages[categoryName]} alt={`${categoryName.toUpperCase()} shoes`} className='cover-image'/>

      <h1 className='section-name'>{categoryName?.toUpperCase()} Shoes</h1>
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

export default Category;
