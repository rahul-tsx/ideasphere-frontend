import { CONTENT_TYPES } from '@/assets/constants/data';
import { validateTweetLink, validateYouTubeLink } from './linkValidator';
import { z } from 'zod';

const tagsSchema = z.array(
	z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
		message: 'Invalid ObjectId format for tags',
	})
);
export const addFormValidator = () =>
	z
		.object({
			title: z
				.string({
					required_error: 'title is required',
				})
				.min(3, 'Title should be at least 3 characters long')
				.max(70, 'Title should be maximum 70 characters long')
				.trim(),
			link: z
				.string({ required_error: 'link is required' })
				.url({ message: 'Invalid URL' }),
			type: z.enum(CONTENT_TYPES),
			tags: tagsSchema,
			note: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			switch (data.type) {
				case 'youtube':
					if (!validateYouTubeLink(data.link)) {
						ctx.addIssue({
                            code: 'custom',
							path: ['link'],
							message:
								'The link must be a valid YouTube URL for the "youtube" type.',
						});
					}
					break;

				case 'tweet':
					if (!validateTweetLink(data.link)) {
						ctx.addIssue({
                            code: 'custom',
							path: ['link'],
							message:
								'The link must be a valid x.com (formerly Twitter) URL for the "tweet" type.',
						});
					}
					break;

				default:
					// Optionally, handle other types with custom validation
					break;
			}
		});
