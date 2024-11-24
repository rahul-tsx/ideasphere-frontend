// src/api/auth/signup.ts
import { tagSchema } from '@/types/tagsTypes';
import client from '../client';

export const createTag = async (tagData: tagSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/tags`,
		tagData
	);
	return response.data;
};
export const getAllTags = async (): Promise<
	[{ value: string; label: string }]
> => {
	const response = await client.get(`${process.env.VITE_SUB_URL}/tags`);
	const tags = response.data.data.map((tag: any) => {
		return { value: tag._id, label: tag.title };
	});
	return tags;
};

// export const getTag = async (
// 	tagId: string
// ): Promise<{ value: string; label: string }> => {
// 	const response = await client.get(
// 		`${process.env.VITE_SUB_URL}/tags/${tagId}`
// 	);
// 	const tag = response.data.data.map((tag: any) => {
// 		return { value: tag._id, label: tag.title };
// 	});
// 	return tag;
// };
