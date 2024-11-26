import useAuthStore from '@/store/authStore';
import client from '../client';

export const checkAuth = async () => {
	const { setLoggedIn, setUsername, setuserId } = useAuthStore.getState();

	try {
		const response = await client.get(`${process.env.VITE_SUB_URL}/auth/me`, {
			withCredentials: true,
		});

		setLoggedIn(true);
		setuserId(response.data.data._id);
		setUsername(response.data.data.username);
		return response.data;
	} catch (error) {
		console.error(error);
		setLoggedIn(false);
		return null;
	}
};
