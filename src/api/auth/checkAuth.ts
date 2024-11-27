import useAuthStore from '@/store/authStore';
import client from '../client';
import { sphereStatus } from '../content/share';

export const checkAuth = async () => {
	const { setLoggedIn, setUsername, setuserId, setSphereStatus } =
		useAuthStore.getState();

	try {
		const response = await client.get(`${process.env.VITE_SUB_URL}/auth/me`, {
			withCredentials: true,
		});
		const sphereStatusData = await sphereStatus();
		setSphereStatus(sphereStatusData.active);

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
