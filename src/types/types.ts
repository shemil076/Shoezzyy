import { AdidasTypes, Brand, NewBalanceTypes, NikeTypes, OrderStatus } from "./enum";

export interface Shoe {
  _id: string,
  name: string;
  brand: Brand
  actualPrice: number;
  offerPrice: number;
  description: string;
  images: string[];
  isATopPick: boolean;
  model: AdidasTypes | NewBalanceTypes | NikeTypes | null;
  sizeUrl: string;
}

export interface Order {
  _id: string;
  jobId: string;
  shoeId: string;
  shoeBrand: Brand
  shoeName: string;
  quantity: number;
  cost: number;
  status: OrderStatus;
}

