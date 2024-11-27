import { useEffect } from 'react';

const TweetComponent = ({ tweetUrl }: { tweetUrl: string }) => {
	const theme = localStorage.getItem('theme');
	useEffect(() => {
		if (window.twttr) {
			window.twttr.widgets.load();
		}
	}, [tweetUrl, theme]);
	console.log('TweetUrl', tweetUrl);

	return (
		<blockquote
			className='twitter-tweet p-4 rounded-lg shadow-lg'
			data-theme={theme}>
			<a href={tweetUrl}></a>
		</blockquote>
	);
};

export default TweetComponent;
