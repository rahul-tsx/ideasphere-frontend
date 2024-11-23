import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalBody, ModalContent } from './ui/animated-modal';
import AddContentForm from './AddContentForm';

interface AddContentModalProps {}

const AddContentModal: FC<AddContentModalProps> = () => {
	return (
		<ModalBody
			modalId='addContent'
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
							<AddContentForm />
						</motion.div>
					</AnimatePresence>
				</div>
			</ModalContent>
		</ModalBody>
	);
};

export default AddContentModal;
