interface IUser {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: string;
    address?: string;
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