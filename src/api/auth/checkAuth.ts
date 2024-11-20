import useAuthStore from '@/store/authStore';
import client from '../client';

export const checkAuth = async () => {
	const { setLoggedIn } = useAuthStore.getState();

	try {
		const response = await client.get(`${process.env.VITE_SUB_URL}/auth/me`, {
			withCredentials: true,
		});

		setLoggedIn(true);
		return response.data;
	} catch (error) {
		console.error(error);
		setLoggedIn(false);
		return null;
	}
};
