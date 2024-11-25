import Card from '@/components/ui/Card';
import { useContent } from '@/hooks/content/useContent';
import { useModal } from '@/hooks/useModal';
import { ContentSchema } from '@/types/contentTypes';
import { FC } from 'react';

interface BlogsProps {}

const Blogs: FC<BlogsProps> = ({}) => {
	const { content, isContentLoading } = useContent();
	let filteredContent: ContentSchema[] = [];

	const { openModal: openUpdateModal } =
		useModal<Omit<ContentSchema, 'link'>>('updateContent');

	filteredContent = content?.filter((unit) => unit.type === 'blog') || [];

	return (
		<div className='bg-app_bg_secondary min-h-[600px] rounded-xl p-10'>
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
						onEdit={() =>
							openUpdateModal({
								note: unit.note,
								tags: unit.tags,
								_id: unit._id,
								title: unit.title,
								type: unit.type,
							})
						}
						// onEdit={() => console.log('Hello world')}
					/>
				))}
		</div>
	);
};

export default Blogs;
