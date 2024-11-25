import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalBody, ModalContent } from './ui/animated-modal';
import UpdateContentForm from './UpdateContentForm';
import { useModal } from '@/hooks/useModal';
import { ContentSchema } from '@/types/contentTypes';

interface UpdateContentModalProps {}

const UpdateContentModal: FC<UpdateContentModalProps> = ({}) => {
	const { modalData } = useModal('updateContent');
	if (!modalData.updateContent) {
		return;
	}

	const { _id, title, type, note, tags } = modalData.updateContent.data as Omit<
		ContentSchema,
		'link'
	>;

	return (
		<ModalBody
			modalId='updateContent'
			className=' bg-app_bg_secondary  text-app_text_primary shadow-lg modal no-scrollbar'>
			<ModalContent>
				<div className='w-full max-w-xl mx-auto bg-transparent p-6'>
					<AnimatePresence mode='wait'>
						<motion.div
							key='addContent'
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.2 }}>
							<UpdateContentForm
								contentId={_id}
								title={title}
								type={type}
								note={note}
								tags={tags}
							/>
						</motion.div>
					</AnimatePresence>
				</div>
			</ModalContent>
		</ModalBody>
	);
};

export default UpdateContentModal;
