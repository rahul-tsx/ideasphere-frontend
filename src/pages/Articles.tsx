import Card from '@/components/ui/Card';
import { useContent } from '@/hooks/content/useContent';
import { useModal } from '@/hooks/useModal';
import { ContentSchema } from '@/types/contentTypes';
import { FC } from 'react';

interface ArticlesProps {}

const Articles: FC<ArticlesProps> = ({}) => {
	const { content, isContentLoading } = useContent();
	let filteredContent: ContentSchema[] = [];

	const { openModal: openUpdateModal } =
		useModal<Omit<ContentSchema, 'link'>>('updateContent');

	filteredContent = content?.filter((unit) => unit.type === 'article') || [];

	return (
		<div className='ideaContainers'>
			{isContentLoading && 'Loading...'}
			{!isContentLoading && filteredContent.length === 0 && (
				<div>No Ideas Found</div>
			)}
			{!isContentLoading &&
				filteredContent!.map((unit) => (
					<Card
						link={unit.link}
						note={unit.note}
						title={unit.title}
						type={unit.type}
						tags={unit.tags}
						contentId={unit._id}
						authorId={unit.authorId}
						onEdit={() =>
							openUpdateModal({
								note: unit.note,
								tags: unit.tags,
								_id: unit._id,
								title: unit.title,
								type: unit.type,
								authorId: unit.authorId,
							})
						}
						// onEdit={() => console.log('Hello world')}
					/>
				))}
			
		</div>
	);
};

export default Articles;
