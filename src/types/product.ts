interface IProduct  {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    images: string[];
    amount: number;
    unit: string;
    createdAt?: Date;
    isDeleted?: boolean;
    inStock: boolean;
  }

  export type { IProduct };