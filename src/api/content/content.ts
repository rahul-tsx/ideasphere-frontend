// src/api/auth/signup.ts
import {
	addContentSchema,
	ContentSchema,
	FetchedIdeaSchema,
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
export const deleteContent = async (contentId: string) => {
	const response = await client.delete(
		`${process.env.VITE_SUB_URL}/content/${contentId}`
	);
	return response.data;
};

export const getAllContent = async (): Promise<ContentSchema[]> => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/content`);
	console.log('my content', response.data.data);
	return response.data.data;
};
export const shareIdea = async (contentId: string) => {
	const response = await client.get(
		`${process.env.VITE_SUB_URL}/content/${contentId}/share`
	);
	return response.data.data;
};
export const fetchIdea = async (hash: string): Promise<FetchedIdeaSchema> => {
	const response = await client.get(
		`${process.env.VITE_SUB_URL}/content/${hash}`
	);
	return response.data.data;
};
