import { useModal } from '@/hooks/useModal';
import { ContentSchema } from '@/types/contentTypes';
import { FC } from 'react';
import Card from './Card';
import { ContentType } from '@/types/utilityTypes';
import noResult from '@/assets/images/noResult.webp';

interface IdeaContainerProps {
	isContentLoading: boolean;
	content: ContentSchema[];
	contentType: ContentType;
}

const IdeaContainer: FC<IdeaContainerProps> = ({
	content,
	isContentLoading,
	contentType,
}) => {
	let filteredContent: ContentSchema[] = [];

	const { openModal: openUpdateModal } =
		useModal<ContentSchema>('updateContent');

	filteredContent = content?.filter((unit) => unit.type === contentType) || [];
	if (!isContentLoading && filteredContent.length === 0) {
		return (
			<div className='ideaContainers'>
				<div className='m-auto reg:col-span-2 2xl:col-span-3 '>
					<img
						src={noResult}
						alt='No Results Found'
						className='rounded-lg max-w-[500px] max-h-[500px]'
					/>
				</div>
			</div>
		);
	}
	return (
		<div className='ideaContainers'>
			{!isContentLoading &&
				filteredContent!.map((unit) => (
					<Card
						key={unit._id}
						content={unit}
						onEdit={() =>
							openUpdateModal({
								note: unit.note,
								tags: unit.tags,
								_id: unit._id,
								title: unit.title,
								type: unit.type,
								link: unit.link,
								authorId: unit.authorId,
							})
						}
					/>
				))}
		</div>
	);
};

export default IdeaContainer;
