import { useContent } from '@/hooks/content/useContent';
import { FC } from 'react';
import Card from './ui/Card';

interface TweetsProps {}

const Tweets: FC<TweetsProps> = ({}) => {
	const { content, isContentLoading } = useContent();
	return (
		<div className='bg-app_bg_secondary min-h-[600px] rounded-xl p-10'>
			{isContentLoading && 'Loading...'}
			{!isContentLoading && !content && <div>No Ideas Found</div>}
			{!isContentLoading &&
				content!.map((unit) => (
					<Card
						link={unit.link}
						note={unit.note}
						title={unit.title}
						type={unit.type}
						tags={unit.tags}
					/>
				))}
		</div>
	);
};

export default Tweets;
