interface IUser {
   _id?:string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: string;
    address?: string;
    role: string;
    verified: boolean;
    createdAt: Date;
}

interface ILogin {
    email: string;
    password: string;
  }

  interface IRegister {
    username: string;
    email: string;
    password: string;
  }
  
  
export type { IUser, ILogin, IRegister};