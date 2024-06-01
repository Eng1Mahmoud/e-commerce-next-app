
interface IAlertState {
    alert: {
      message: string;
      type: 'success' | 'error' | 'info' | 'warning' | '';
    };
    setAlert: (alert: IAlertState['alert']) => void;
  }
  
  
interface IUserStore {
  user: {
    token: string;
    exp: number;
    _id: string;
    userInfo:{
      role: string;
      _id: string;
      username: string;
      email: string;
      password: string;
      avatar: string;
      phone: string;
      address: string;
    } | null;
  };
  updateUser: (user: IUserStore["user"]) => void;
  // logout delete user from storage
   logout: () => void;
     // fetch user after login and store in storage
  fetchUser: () => Promise<void>;
}
  export type { IAlertState,IUserStore };