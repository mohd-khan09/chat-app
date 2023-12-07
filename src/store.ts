import { create } from 'zustand';

interface ErrorState {
  StoreError: string | null;
  SetStoreError: (error: string) => void;
}
interface User {
  id: number | null;
  avatar: string | null;
  userName: string | null;
  messageText: string | null;
}
interface Store {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}
export const UseErrorStore = create<ErrorState>((set) => ({
  StoreError: null,
  SetStoreError: (error: string) =>
    set((state) => ({ ...state, StoreError: error })),
}));

export const UserDataStore = create<Store>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set((state) => ({ ...state, selectedUser: user })),
}));
