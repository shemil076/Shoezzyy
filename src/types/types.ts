import { Brand, OrderStatus } from "./enum";

export interface Shoe {
    _id: string,
    name: string;
    brand: Brand
    price: number;
    description : string;
    images: string[];
  }
  
  export interface Order {
    _id : string;
    jobId: string;
    shoeId: string;
    shoeBrand: Brand
    shoeName: string;
    quantity: number;
    cost: number;
    status: OrderStatus;
  }