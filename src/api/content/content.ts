// src/api/auth/signup.ts
import {
	addContentSchema,
	ContentSchema,
	updateContentSchema,
} from './../../types/contentTypes';
import client from '../client';

export const addContent = async (contentData: addContentSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/content`,
		contentData
	);
	return response.data;
};
export const updateContent = async (
	contentData: updateContentSchema,
	contentId: string
) => {
	const response = await client.patch(
		`${process.env.VITE_SUB_URL}/content/${contentId}`,
		contentData
	);
	return response.data;
};

export const getAllContent = async (): Promise<ContentSchema[]> => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/content`);
	console.log('my content', response.data.data);
	return response.data.data;
};
