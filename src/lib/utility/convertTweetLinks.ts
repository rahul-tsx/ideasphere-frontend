export const convertTweetLinks = (
	tweetUrl: string
): { url: string; tweetId: string | null } => {
	
	if (tweetUrl.includes('x.com')) {
		tweetUrl = tweetUrl.replace(/^https?:\/\/x.com/, 'https://twitter.com');
	}
	const regex = /(?:twitter\.com\/(?:.*)\/status\/)(\d+)/;
	const match = tweetUrl.match(regex);
	let tweetId = null;

	if (match && match[1]) {
		tweetId = match[1];
	}

	return { url: tweetUrl, tweetId };
};
