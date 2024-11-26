import { useContent } from '@/hooks/content/useContent';
import { FC } from 'react';
import Card from '../components/ui/Card';
import { ContentSchema } from '@/types/contentTypes';
import { useModal } from '@/hooks/useModal';

interface TweetsProps {}

const Tweets: FC<TweetsProps> = ({}) => {
	const { content, isContentLoading } = useContent();
	let filteredContent: ContentSchema[] = [];

	const { openModal: openUpdateModal } =
		useModal<Omit<ContentSchema, 'link'>>('updateContent');

	filteredContent = content?.filter((unit) => unit.type === 'tweet') || [];

	return (
		<div className='ideaContainers'>
			{isContentLoading && 'Loading...'}
			{!isContentLoading && filteredContent.length === 0 && (
				<div>No Ideas Found</div>
			)}
			{!isContentLoading &&
				filteredContent!.map((unit) => (
					<Card
						contentId={unit._id}
						link={unit.link}
						note={unit.note}
						title={unit.title}
						type={unit.type}
						tags={unit.tags}
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
					
					/>
				))}
		</div>
	);
};

export default Tweets;
