import { FC } from 'react';
import { FaTrash, FaEdit, FaShareAlt, FaCopy } from 'react-icons/fa';
import { SlSizeFullscreen } from 'react-icons/sl';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useStatus from '@/hooks/useStatus';
import { getHostname } from '@/lib/utility/getHostname';
import { useCopySharedContent } from '@/hooks/content/useCopySharedIdea';

interface CardSideBarProps {
	onDelete?: () => void;
	onEdit?: () => void;
	onFullScreen?: () => void;
	shareAbleHash: string;
	owner: boolean;
}

const CardSideBar: FC<CardSideBarProps> = ({
	onDelete,
	onEdit,
	onFullScreen,

	shareAbleHash,
	owner,
}) => {
	const changeStatus = useStatus();
	const { mutate: copyIdea } = useCopySharedContent();
	const hostname = getHostname();
	if (!shareAbleHash) {
		return;
	}

	const shareableLink = `http://${hostname}/dashboard/shared/${shareAbleHash}`;
	return (
		<motion.div
			className='z-10 absolute top-3 -right-4  '
			initial={{ opacity: 0, right: '-12px' }}
			animate={{ opacity: 100 }}
			exit={{ opacity: 0, right: '-12px' }}
			transition={{
				opacity: { duration: 0.3, delay: 1 },
			}}
			whileHover={{ right: '-50px' }}
			style={{ transformOrigin: 'right center' }}>
			<motion.div className=' right-9 flex flex-col items-center justify-between space-y-4 bg-app_card_primaryborder p-4  rounded-r-[30px] shadow-2xl shadow-app_card_primaryshadow '>
				<button
					className='bg-slate-500 text-white rounded-full p-2 hover:bg-slate-700 transition'
					onClick={onFullScreen}>
					<SlSizeFullscreen />
				</button>
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
						onClick={() => copyIdea({ hash: shareAbleHash })}
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
