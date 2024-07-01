import { Brand } from "../types/enum";
import { Shoe } from "../types/types";

const brandNames: Record<Brand, string> = {
    [Brand.ADIDAS]: 'Adidas',
    [Brand.ALLSTARCONVERSE]: 'All Star Converse',
    [Brand.NEWBALANCE]: 'New Balance',
    [Brand.NIKE]: 'Nike',
    [Brand.VANSOLDSKOOL]: 'Vans Old Skool'
  };

export  const getReadableBrandName = (brandKey: Brand): string => {
    return brandNames[brandKey];
  };


export const categorizeShoesByBrand = (shoes: Shoe[]): { [key: string]: Shoe[] } => {
  return shoes.reduce((acc, shoe) => {
    if (!acc[shoe.brand]) {
      acc[shoe.brand] = [];
    }
    acc[shoe.brand].push(shoe);
    return acc;
  }, {} as { [key: string]: Shoe[] });
};

