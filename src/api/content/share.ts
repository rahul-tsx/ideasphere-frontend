import { FetchedIdeaSchema } from '@/types/contentTypes';
import client from '../client';

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
	console.log(response.data.data);
	return response.data.data;
};
export const copySphere = async (username: string, hash: string) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/shared/${username}/${hash}/copy`
	);
	return response.data.data;
};
