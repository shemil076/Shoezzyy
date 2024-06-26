export interface Shoe {
    name: string;
    brand: 'men' | 'women' | 'kids';
    image: string;
  }
  
  export interface Order {
    jobId: string;
    shoeId: Shoe;
    status: 'pending' | 'completed';
  }