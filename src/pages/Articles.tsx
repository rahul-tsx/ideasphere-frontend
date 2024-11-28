import Skeleton from '@/components/ui/custom/Skeleton';
import IdeaContainer from '@/components/ui/IdeaContainer';
import { useContent } from '@/hooks/content/useContent';
import { FC } from 'react';

interface ArticlesProps {}

const Articles: FC<ArticlesProps> = ({}) => {
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
					contentType='article'
					isContentLoading={isContentLoading}
				/>
			)}
		</>
	);
};

export default Articles;
