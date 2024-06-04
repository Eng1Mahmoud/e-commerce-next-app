interface ICategorise {
    _id?: string;
    name: string;
    description: string;
    createdAt?: Date;
    isDeleted?: boolean;
    image: string;
  }
  
  export type { ICategorise
}