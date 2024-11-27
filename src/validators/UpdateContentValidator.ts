import { CONTENT_TYPES } from '@/assets/constants/data';
import { validateTweetLink, validateYouTubeLink } from './linkValidator';
import { z } from 'zod';

const tagsSchema = z
	.array(
		z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
			message: 'Invalid ObjectId format for tags',
		})
	)
	.optional();
export const updateContentValidator = (link: string) =>
	z
		.object({
			title: z
				.string()
				.optional()
				.refine((value) => value === undefined || value.length > 0, {
					message: 'Title cannot be empty if provided',
				})
				.transform((value) => (value ? value.trim() : undefined))
				.refine((value) => value === undefined || value.length >= 3, {
					message: 'Title should be at least 3 characters long',
				})
				.refine((value) => value === undefined || value.length <= 70, {
					message: 'Title should be maximum 70 characters long',
				}),
			type: z.enum(CONTENT_TYPES).optional(),
			tags: tagsSchema,
			note: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			switch (data.type) {
				case 'youtube':
					if (!validateYouTubeLink(link)) {
						ctx.addIssue({
							code: 'custom',
							path: ['type'],
							message:
								'The link must be a valid YouTube URL for the "youtube" type.',
						});
					}
					break;

				case 'tweet':
					if (!validateTweetLink(link)) {
						ctx.addIssue({
							code: 'custom',
							path: ['type'],
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
