import { create } from 'zustand';

interface ErrorState {
  StoreError: string | null;
  SetStoreError: (error: string) => void;
}
const UseErrorStore = create<ErrorState>((set) => ({
  StoreError: null,
  SetStoreError: (error: string) =>
    set((state) => ({ ...state, StoreError: error })),
}));
export default UseErrorStore;
