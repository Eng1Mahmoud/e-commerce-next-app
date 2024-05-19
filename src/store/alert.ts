import {create} from 'zustand';

interface AlertState {
  alert: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | '';
  };
  setAlert: (alert: AlertState['alert']) => void;
}

export const alertStore = create<AlertState>((set) => ({
  alert: {
    message: '',
    type: 'info',
  },
  setAlert: (alert) => set(() => ({ alert })),
}));