// src/api/auth/signup.ts
import { addContentSchema } from './../../types/contentTypes';
import client from '../client';
import { ContentType } from '@/types/utilityTypes';

export const addContent = async (contentData: addContentSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/content`,
		contentData
	);
	return response.data;
};

export const getAllContent = async (): Promise<
	{
		title: string;
		note?: string;
		tags?: { _id: string; title: string }[];
		type: ContentType;
		link: string;
	}[]
> => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/content`);
	console.log('my content', response.data.data);
	return response.data.data;
};
