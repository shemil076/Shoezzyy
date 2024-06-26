import { Brand } from "../types/enum";

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