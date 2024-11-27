import { useEffect } from 'react';

const TweetComponent = ({ tweetUrl }: { tweetUrl: string }) => {
	const theme = localStorage.getItem('theme');
	useEffect(() => {
		if (window.twttr) {
			window.twttr.widgets.load();
		}
	}, [tweetUrl, theme]);


	return (
		<blockquote
			className=' p-4 rounded-lg shadow-lg '
			data-theme={theme}>
			<a href={tweetUrl}></a>
		</blockquote>
	);
};

export default TweetComponent;
