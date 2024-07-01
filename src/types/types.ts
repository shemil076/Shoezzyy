import { Brand } from "./enum";

export interface Shoe {
    _id: string,
    name: string;
    brand: Brand
    price: number;
    description : string;
    images: string[];
  }
  
  export interface Order {
    jobId: string;
    shoeId: Shoe;
    status: 'pending' | 'completed';
  }