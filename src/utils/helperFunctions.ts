import { Brand } from "../types/enum";
import { Order, Shoe } from "../types/types";

const brandNames: Record<Brand, string> = {
  [Brand.ADIDAS]: 'Adidas',
  [Brand.ALLSTARCONVERSE]: 'All Star Converse',
  [Brand.NEWBALANCE]: 'New Balance',
  [Brand.NIKE]: 'Nike',
  [Brand.VANS]: 'Vans',
  [Brand.OTHER] : 'Other'
};


export const getReadableBrandName = (brandKey: Brand): string => {
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


export const categorizeShoesByModel = (shoes: Shoe[]): { [key: string]: Shoe[] } => {
  return shoes.reduce((acc, shoe) => {
    if (shoe.model) {
      if (!acc[shoe.model]) {
        acc[shoe.model] = [];
      }
      acc[shoe.model].push(shoe);
    }
    return acc;
  }, {} as { [key: string]: Shoe[] })
}

export const getOrderDetailsByJobId = (orders: Order[], jobId: string): Order | undefined => {
  const filteredOrders = orders.filter((order) => (order.jobId === jobId));
  return filteredOrders.length > 0 ? filteredOrders[0] : undefined;
};

export const getShoesByBrand = (shoes: Shoe[], brandName: string): Shoe[] => {
  const filteredShoes = shoes.filter((shoe) => (shoe.brand === brandName));
  return filteredShoes.length > 0 ? filteredShoes : [];
};

export const getOnlyTopPicks = (shoes: Shoe[]): Shoe[] => {
  const filteredShoes = shoes.filter((shoe) => (shoe.isATopPick));
  return filteredShoes.length > 0 ? filteredShoes : [];
}

export const getInstantDeliveries = (shoes : Shoe[]) : Shoe[] =>{
  const filteredShoes = shoes.filter((shoe) => (shoe.isInstantDelivery));
  return filteredShoes.length > 0 ? filteredShoes : [];
}
export const normalizeBrand = (brand: string | undefined): Brand | undefined => {
  if (!brand) return undefined;
  switch (brand.toLowerCase()) {
    case 'adidas':
      return Brand.ADIDAS;
    case 'allstarconverse':
      return Brand.ALLSTARCONVERSE;
    case 'newbalance':
      return Brand.NEWBALANCE;
    case 'nike':
      return Brand.NIKE;
    case 'vans':
      return Brand.VANS;
    case 'other':
      return Brand.OTHER;
    default:
      return undefined;
  }
};

export const getReadableModelName = (brand: Brand, model: string): string => {
  let readableModel: string = model;
  if (brand === Brand.ADIDAS || brand === Brand.NIKE || brand === Brand.OTHER) {
    readableModel = model.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(\d+)/g, ' $1 ')
      .replace(/^./, str => str.toUpperCase());
  }
  return readableModel;
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]; 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}