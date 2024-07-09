import { Brand } from "../types/enum";
import { Order, Shoe } from "../types/types";

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


export const getOrderDetailsByJobId = (orders : Order[], jobId : string): Order | undefined => {
    const filteredOrders = orders.filter((order)=> (order.jobId === jobId));
    return filteredOrders.length > 0 ? filteredOrders[0] : undefined;
};

export const getShoesByBrand = (shoes : Shoe[], brandName : string): Shoe[] => {
  const filteredShoes = shoes.filter((shoe)=> (shoe.brand === brandName));
  return filteredShoes.length > 0 ? filteredShoes : [];
};
