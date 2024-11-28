import Skeleton from '@/components/ui/custom/Skeleton';
import IdeaContainer from '@/components/ui/IdeaContainer';
import { useContent } from '@/hooks/content/useContent';
import { FC } from 'react';

interface PodcastsProps {}

const Podcasts: FC<PodcastsProps> = ({}) => {
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
					contentType='podcasts'
					isContentLoading={isContentLoading}
				/>
			)}
		</>
	);
};

export default Podcasts;
