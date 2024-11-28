import Skeleton from '@/components/ui/custom/Skeleton';
import IdeaContainer from '@/components/ui/IdeaContainer';
import { useContent } from '@/hooks/content/useContent';

import { FC } from 'react';

interface DocumentsProps {}

const Documents: FC<DocumentsProps> = ({}) => {
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
					contentType='document'
					isContentLoading={isContentLoading}
				/>
			)}
		</>
	);
};

export default Documents;
