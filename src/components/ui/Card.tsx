import { ContentType } from '@/types/utilityTypes';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import defaultImage from '@/assets/images/ideasphere.webp';
import CardSideBar from './custom/CardSidebar';
import AlertBox from './custom/AlertBox';
import { useDeleteContent } from '@/hooks/content/useDeleteContent';
import { useShareContent } from '@/hooks/content/useShareContent';
import useAuthStore from '@/store/authStore';
import { useCopySharedContent } from '@/hooks/content/useCopySharedIdea';
import { extractYouTubeId } from '@/lib/utility/extractYoutubeId';
import TweetComponent from '../TweetComponent';
import { convertTweetLinks } from '@/lib/utility/convertTweetLinks';

interface CardProps {
	contentId: string;
	title: string;
	link: string;
	note?: string;
	authorId: string;
	tags?: { _id: string; title: string }[];
	type: ContentType;
	image?: string; // Optional image prop
	onEdit?: () => void; // Optional edit callback
	onShare?: () => void; // Optional share callback
}

const Card: FC<CardProps> = ({
	contentId,
	title,
	link,
	note,
	tags,
	type,
	image,
	authorId,
	onEdit,
}) => {
	// Renders content based on the type
	const [alertOpen, setAlertOpen] = useState(false);
	const { mutate: deleteIdea } = useDeleteContent();
	const { data: hash } = useShareContent(contentId);
	const { userId } = useAuthStore();

	const triggerAlertBox = () => {
		setAlertOpen(true);
	};
	const handleConfirm = () => {
		deleteIdea({ contentId });
	};

	const renderContent = () => {
		switch (type) {
			case 'tweet':
				console.log('tweet url', link);
				const tweetUrl = convertTweetLinks(link);
				return <TweetComponent tweetUrl={tweetUrl} />;

			case 'youtube':
				console.log('Youtub id', extractYouTubeId(link));
				return (
					<iframe
						width='100%'
						height='200'
						src={`https://www.youtube.com/embed/
							${extractYouTubeId(link)}
						`}
						title='YouTube video'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen></iframe>
				);

			default:
				return (
					<a
						href={link}
						className='text-blue-500 underline break-words'
						target='_blank'
						rel='noopener noreferrer'>
						Visit Link
					</a>
				);
		}
	};

	return (
		<div className='relative '>
			<motion.div
				className=' bg-app_card_primary_bg min-h-[350px] text-app_text_primary shadow-app_card_primaryshadow border-2 border-app_card_primaryborder shadow-lg rounded-lg p-6 relative overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 z-20'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}>
				{type !== 'youtube' && type !== 'tweet' && (
					<div className='relative w-full h-48 overflow-hidden rounded-lg mb-4'>
						<img
							src={image || defaultImage}
							alt={title}
							className='object-cover w-full h-full'
						/>
					</div>
				)}
				<h2 className='text-xl font-semibold mb-4'>{title}</h2>
				<div className='content mb-4'>{renderContent()}</div>
				<div className='tags flex flex-wrap gap-2'>
					{tags &&
						tags.map((tag) => (
							<span
								key={tag._id}
								className='bg-app_btn_primary_bg text-white font-semibold px-4 py-1 rounded-full text-sm'>
								{tag.title}
							</span>
						))}
				</div>
				{note && <p className='mt-4 text-app_text_secondary text-sm'>{note}</p>}

				{/* Sidebar with Action Buttons */}
			</motion.div>
			<CardSideBar
				owner={userId === authorId}
				onDelete={triggerAlertBox}
				onEdit={onEdit}
				shareAbleHash={hash}
			/>

			<AlertBox
				open={alertOpen}
				setOpen={setAlertOpen}
				onConfirm={handleConfirm}
				title='Do you wish to delete your idea?'
				description={`This is destructive and you won't be able to retrieve your idea back`}
			/>
		</div>
	);
};

export default Card;
