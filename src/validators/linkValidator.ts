import { getHostname } from '@/lib/utility/getHostname';
import { z } from 'zod';

export const linkValidator = z
	.string()
	.transform((input) => {
		try {
			const url = new URL(input);
			const hostname = getHostname();
			const port = process.env.VITE_FRONTEND_PORT;
			const pathname = '/dashboard/shared';

			const isCorrectHostname = url.hostname === hostname;
			console.log(isCorrectHostname);
			const isCorrectPort = port ? url.port === port : true;
			console.log(isCorrectPort);
			const isCorrectPathname = url.pathname.startsWith(pathname);
			console.log(isCorrectPathname);
			const pathParts = url.pathname.split('/').filter(Boolean);

			const [username, hash] = pathParts.slice(-2);

			const isValidUsername = username
				? /^[a-zA-Z0-9*@#_-]+$/.test(username)
				: true;
			console.log(isValidUsername);

			const isValidHash = hash && /^[A-Za-z0-9-$_.]{60}$/.test(hash);
			console.log(isValidHash);

			if (
				isCorrectHostname &&
				isCorrectPort &&
				isCorrectPathname &&
				isValidHash &&
				isValidUsername
			) {
				return { username, hash };
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
	})
	.refine((result) => result !== null, {
		message: 'Invalid Link',
	});

// validationUtils.ts
export const validateYouTubeLink = (link: string): boolean =>
	link.includes('youtube.com') || link.includes('youtu.be');

export const validateTweetLink = (link: string): boolean =>
	link.includes('x.com') || link.includes('twitter.com');

// Add more validators as needed
export const validateCustomLink = (link: string, domain: string): boolean =>
	link.includes(domain);
