// src/api/auth/signup.ts
import { addContentSchema } from './../../types/contentTypes';
import client from '../client';

export const addContent = async (contentData: addContentSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/content`,
		contentData
	);
	return response.data;
};

export const getAllContent = async () => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/content`);

	return response.data;
};
