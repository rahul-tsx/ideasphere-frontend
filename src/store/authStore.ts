import { create } from 'zustand';

interface AuthState {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  setLoggedIn: (value) => set({ loggedIn: value }),
}));

export default useAuthStore;
