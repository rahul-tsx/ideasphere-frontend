import { useContent } from '@/hooks/content/useContent';
import { FC } from 'react';
import IdeaContainer from '@/components/ui/IdeaContainer';
import Skeleton from '@/components/ui/custom/Skeleton';

interface TweetsProps {}

const Tweets: FC<TweetsProps> = ({}) => {
	const { content, isContentLoading } = useContent();

	return (
		<>
			{isContentLoading && (
				<div className='ideaContainers'>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)}
			{content && (
				<IdeaContainer
					content={content}
					contentType='tweet'
					isContentLoading={isContentLoading}
				/>
			)}
		</>
	);
};

export default Tweets;
