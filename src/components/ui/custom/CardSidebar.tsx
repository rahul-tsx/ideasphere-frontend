import { FC } from 'react';
import { FaTrash, FaEdit, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CardSideBarProps {
	onDelete?: () => void;
	onEdit?: () => void;
	onShare?: () => void;
}

const CardSideBar: FC<CardSideBarProps> = ({ onDelete, onEdit, onShare }) => {
	return (
		<motion.div
			className='z-10 absolute top-3 -right-4  '
			initial={{ opacity: 0, right: '-16px' }}
			animate={{ opacity: 100 }}
			exit={{ opacity: 0, right: '-16px' }}
			transition={{
				opacity: { duration: 0.3, delay: 1 },
			}}
			whileHover={{ right: '-60px' }}
			style={{ transformOrigin: 'right center' }}>
			<motion.div className=' right-9 flex flex-col items-center justify-between space-y-4 bg-app_card_primaryborder p-4  rounded-r-[30px] shadow-2xl shadow-app_card_primaryshadow '>
				<button
					onClick={onEdit}
					className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition'>
					<FaEdit />
				</button>

				<button
					onClick={onDelete}
					className='bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition'>
					<FaTrash />
				</button>

				<button
					onClick={onShare}
					className='bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition'>
					<FaShareAlt />
				</button>
			</motion.div>
		</motion.div>
	);
};

export default CardSideBar;
