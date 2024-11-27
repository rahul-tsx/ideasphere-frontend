import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	loggedIn: boolean;
	username: string;
	userId: string;
	sphereStatus: boolean;
	setSphereStatus: (value: boolean) => void;
	setLoggedIn: (value: boolean) => void;
	setuserId: (value: string) => void;
	setUsername: (value: string) => void;
}


const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			username: 'User',
			userId: '',
			sphereStatus: false,
			setSphereStatus: (value: boolean) => set({ sphereStatus: value }),
			setuserId: (value) => set({ userId: value }),
			loggedIn: false,
			setLoggedIn: (value: boolean) => set({ loggedIn: value }),
			setUsername: (value) => set({ username: value }),
		}),
		{ name: 'auth-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);

export default useAuthStore;
