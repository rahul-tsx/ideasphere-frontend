import { ContentType } from '@/types/utilityTypes';
import { FC } from 'react';
import { motion } from 'framer-motion';
import defaultImage from '@/assets/images/ideasphere.webp';
import { FaTrash, FaEdit, FaShareAlt } from 'react-icons/fa';
import CardSideBar from './custom/CardSidebar';

interface CardProps {
	title: string;
	link: string;
	note?: string;
	tags?: { _id: string; title: string }[];
	type: ContentType;
	image?: string; // Optional image prop
	onDelete?: () => void; // Optional delete callback
	onEdit?: () => void; // Optional edit callback
	onShare?: () => void; // Optional share callback
}

const Card: FC<CardProps> = ({
	title,
	link,
	note,
	tags,
	type,
	image,
	onDelete,
	onEdit,
	onShare,
}) => {
	// Renders content based on the type
	const renderContent = () => {
		switch (type) {
			case 'tweet':
				return (
					<blockquote className='twitter-tweet'>
						<a href={link}>View Tweet</a>
					</blockquote>
				);

			case 'youtube':
				return (
					<iframe
						width='100%'
						height='200'
						src={`https://www.youtube.com/embed/${new URL(
							link
						).searchParams.get('v')}`}
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
		<div className='relative max-w-[30%] '>
			<motion.div
				className=' bg-app_card_primary_bg text-app_text_primary shadow-app_card_primaryshadow border-2 border-app_card_primaryborder shadow-lg rounded-lg p-6 relative overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 z-20'
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}>
				<div className='relative w-full h-48 overflow-hidden rounded-lg mb-4'>
					<img
						src={image || defaultImage}
						alt={title}
						className='object-cover w-full h-full'
					/>
				</div>

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

				{/* Action icons for edit and share
        <div className='flex justify-between items-center mt-4'>
            <button
                onClick={onEdit}
                className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition'>
                <FaEdit />
            </button>
            
                <button
                    onClick={onDelete}
                    className='absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition'>
                    <FaTrash />
                </button>
            

            <button
                onClick={onShare}
                className='bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition'>
                <FaShareAlt />
            </button>
        </div> */}
				{/* Sidebar with Action Buttons */}
			</motion.div>
			<CardSideBar
				onDelete={onDelete}
				onEdit={onEdit}
				onShare={onShare}
			/>
		</div>
	);
};

export default Card;
