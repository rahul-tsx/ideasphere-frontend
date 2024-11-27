export const convertTweetLinks = (tweetUrl: string): string => {
	if (tweetUrl.includes('twitter.com')) {
		return tweetUrl;
	}
	return tweetUrl.replace(/^https?:\/\/x.com/, 'https://twitter.com');
};
