interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
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