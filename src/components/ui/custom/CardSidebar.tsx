import { FC } from 'react';
import { FaTrash, FaEdit, FaShareAlt, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useStatus from '@/hooks/useStatus';
import { getHostname } from '@/lib/utility/getHostname';
import { escapeSlashInHash } from '@/lib/utility/escapeSlashInHash';

interface CardSideBarProps {
	onDelete?: () => void;
	onEdit?: () => void;
	onCopy?: () => void;
	shareAbleHash: string;
	owner: boolean;
}

const CardSideBar: FC<CardSideBarProps> = ({
	onDelete,
	onEdit,
	onCopy,
	shareAbleHash,
	owner,
}) => {
	const changeStatus = useStatus();
	const hostname = getHostname();
	if (!shareAbleHash) {
		return;
	}

	const shareableLink = `http://${hostname}:${
		process.env.VITE_FRONTEND_PORT
	}/dashboard/shared/${escapeSlashInHash(shareAbleHash)}`;
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
				{owner && (
					<button
						onClick={onEdit}
						className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition'>
						<FaEdit />
					</button>
				)}

				{owner && (
					<button
						onClick={onDelete}
						className='bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition'>
						<FaTrash />
					</button>
				)}
				{!owner && (
					<button
						onClick={onCopy}
						className='bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition'>
						<FaCopy />
					</button>
				)}
				<CopyToClipboard
					text={shareableLink}
					onCopy={() => changeStatus('Link Copied to Clipboard', 'success')}>
					<button className='bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition'>
						<FaShareAlt />
					</button>
				</CopyToClipboard>
			</motion.div>
		</motion.div>
	);
};

export default CardSideBar;
