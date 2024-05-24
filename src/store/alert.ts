import {create} from 'zustand';
import { IAlertState } from '@/types/store';
export const alertStore = create<IAlertState>((set) => ({
  alert: {
    message: '',
    type: '',
  },
  setAlert: (alert) => set(() => ({ alert })),
}));