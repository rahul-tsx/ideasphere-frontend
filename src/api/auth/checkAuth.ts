import useAuthStore from '@/store/authStore';
import client from '../client';

export const checkAuth = async () => {
	const { setLoggedIn, setUsername } = useAuthStore.getState();

	try {
		const response = await client.get(`${process.env.VITE_SUB_URL}/auth/me`, {
			withCredentials: true,
		});

		setLoggedIn(true);
		setUsername(response.data.data.username);
		return response.data;
	} catch (error) {
		console.error(error);
		setLoggedIn(false);
		return null;
	}
};
