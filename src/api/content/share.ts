import { FetchedIdeaSchema } from '@/types/contentTypes';
import client from '../client';
import useAuthStore from '@/store/authStore';

export const shareSphere = async () => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/shared`);

	return response.data.data;
};
export const fetchSphere = async (
	username: string,
	hash: string
): Promise<FetchedIdeaSchema[]> => {
	const response = await client.get(
		`${process.env.VITE_SUB_URL}/shared/${username}/${hash}`
	);
	return response.data.data;
};
export const toggleSphereVisibility = async (
	active: boolean
): Promise<{ active: boolean }> => {
	const response = await client.patch(`${process.env.VITE_SUB_URL}/shared`, {
		active,
	});
	return response.data.data;
};
export const sphereStatus = async () => {
	// const { setSphereStatus } = useAuthStore();
	try {
		const response = await client.get(
			`${process.env.VITE_SUB_URL}/shared/status`
		);
		

		// setSphereStatus(response.data.data.active);

		return response.data.data;
	} catch (error) {
		return null;
	}
};
export const copySphere = async (username: string, hash: string) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/shared/${username}/${hash}/copy`
	);
	return response.data.data;
};
