import { Brand } from "../types/enum";

const brandNames: Record<Brand, string> = {
    [Brand.Adidas]: 'Adidas',
    [Brand.AllStarConverse]: 'All Star Converse',
    [Brand.NewBalance]: 'New Balance',
    [Brand.Nike]: 'Nike',
    [Brand.VansOldSkool]: 'Vans Old Skool'
  };

export  const getReadableBrandName = (brandKey: Brand): string => {
    return brandNames[brandKey];
  };