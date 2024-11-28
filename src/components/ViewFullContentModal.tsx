import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalBody, ModalContent } from './ui/animated-modal';
import { ContentSchema } from '@/types/contentTypes';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Tweet } from 'react-tweet';
import { convertTweetLinks } from '@/lib/utility/convertTweetLinks';
import { extractYouTubeId } from '@/lib/utility/extractYoutubeId';

interface ViewFullContentModalProps {
	content: ContentSchema;
}

const ViewFullContentModal: FC<ViewFullContentModalProps> = ({ content }) => {
	let mainContent;
	switch (content.type) {
		case 'tweet':
			const tweetUrl = convertTweetLinks(content.link);
			mainContent = (
				<div className='flex mx-auto'>
					<Tweet id={tweetUrl.tweetId!} />
				</div>
			);
			break;
		case 'youtube':
			
	
			mainContent = (
				<iframe
					width='100%'
					height='500px'
					className='p-5 rounded-lg '
					src={`https://www.youtube.com/embed/${extractYouTubeId(
						content.link
					)}`}
					title='YouTube video'
					frameBorder='0'
					color='red'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen></iframe>
			);
			break;
		case 'document':
			mainContent = (
				<iframe
					src={content.link}
					width='100%'
					height='450px'
					className='border-none rounded-lg p-4'></iframe>
			);
			break;
		case 'article':
			mainContent = (
				<iframe
					src={content.link}
					width='100%'
					height='450px'
					className='border-none rounded-lg p-4'></iframe>
			);
			break;
		case 'blog':
			mainContent = (
				<iframe
					src={content.link}
					width='100%'
					height='450px'
					className='border-none rounded-lg p-4'></iframe>
			);
			break;
		case 'podcasts':
			mainContent = (
				<iframe
					src={content.link}
					width='100%'
					height='450px'
					className='border-none rounded-lg p-4'></iframe>
			);
			break;

		default:
			mainContent = (
				<iframe
					src={content.link}
					width='100%'
					height='450px'
					className='border-none rounded-lg p-4'></iframe>
			);
			break;
	}

	return (
		<ModalBody
			modalId='ViewFullCard'
			className=' bg-app_bg_secondary  text-app_text_primary shadow-lg modal no-scrollbar '
			modalSize='min-w-[75%] min-h-[75%]'>
			<ModalContent>
				<div className='w-full mx-auto bg-transparent p-4'>
					<AnimatePresence mode='wait'>
						<motion.div
							key='addContent'
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.2 }}>
							<div className='flex flex-col gap-y-3'>
								<p className='text-3xl font-bold'>{content.title}</p>
								<a
									href={content.link}
									target='_blank'
									className='flex  items-center space-x-4 hover:cursor-pointer hover:underline'>
									<p>Visit Original Site</p> <FaExternalLinkAlt size={15} />{' '}
								</a>
								{mainContent}

								<div className='flex space-x-5'>
									{content.tags?.map((tag) => (
										<span
											key={tag._id}
											className='bg-app_btn_primary_bg text-white font-semibold px-4 py-1 rounded-full '>
											{tag.title}
										</span>
									))}
								</div>
								{content.note && (
									<div className='max-h-[200px] overflow-y-scroll custom-scrollbar text-balance'>
										<p>Your Note</p>
										<p className='w-[95%]'>{content.note} </p>
									</div>
								)}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</ModalContent>
		</ModalBody>
	);
};

export default ViewFullContentModal;
