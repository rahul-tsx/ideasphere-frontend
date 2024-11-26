import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	loggedIn: boolean;
	username: string;
	userId: string;
	setLoggedIn: (value: boolean) => void;
	setuserId: (value: string) => void;
	setUsername: (value: string) => void;
}

// const useAuthStore = create<AuthState>((set) => ({
// 	loggedIn: false,
// 	setLoggedIn: (value) => set({ loggedIn: value }),
// }));

const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			username: 'User',
			userId: '',
			setuserId: (value) => set({ userId: value }),
			loggedIn: false,
			setLoggedIn: (value: boolean) => set({ loggedIn: value }),
			setUsername: (value) => set({ username: value }),
		}),
		{ name: 'auth-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);

export default useAuthStore;
