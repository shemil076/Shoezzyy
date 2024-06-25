export interface Shoe {
    name: string;
    category: 'men' | 'women' | 'kids';
    image: string;
  }
  
  export interface Order {
    jobId: string;
    shoeId: Shoe;
    status: 'pending' | 'completed';
  }