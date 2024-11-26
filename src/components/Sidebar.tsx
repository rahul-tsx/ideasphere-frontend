import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomSwitch } from './ui/custom/CustomSwitch';
import { useToggleSphereVisibility } from '@/hooks/sphere/useToggleSphereVisibility';

interface SidebarProps {
	tags: string[];
}

const Sidebar: FC<SidebarProps> = ({ tags }) => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const activeIndex = tags.findIndex(
		(tag) =>
			`${tag.toLowerCase()}` ===
			location.pathname.split('/').filter(Boolean).pop()
	);
	const { mutate: toggleVisibility } = useToggleSphereVisibility();
	const handleVisibilityToggle = (checked: boolean) => {
		console.log(checked);
		toggleVisibility({ active: checked });
	};
	return (
		<div
			className={`flex-none flex flex-col w-[300px] min-w-[200px] max-w-[300px] h-[90vh] bg-app_bg_secondary dark:bg-app_bg_secondary sticky top-24`}>
			{/* Sidebar for larger screens */}
			<div className='relative grid py-6 flex-grow'>
				<div className='relative'>
					<div className='grid gap-y-4 relative'>
						{activeIndex !== -1 && (
							<motion.div
								className='absolute inset-0 h-12 bg-app_btn_primary_bg rounded-lg rounded-r-full z-0'
								initial={{ top: 0 }}
								animate={{ top: `${activeIndex * (48 + 16)}px` }}
								transition={{ type: 'spring', stiffness: 300, damping: 20 }}
							/>
						)}

						{/* Dynamic Links */}
						{tags.map((tag, index) => (
							<Link
								to={`${tag.toLowerCase()}`}
								key={index}
								className={`relative z-10 pl-10 h-12 flex items-center text-app_text_primary ${
									activeIndex === index
										? 'hover:text-app_text_primary '
										: 'hover:text-app_text_hover'
								}  text-lg font-semibold transition-all duration-300 ${
									activeIndex === index ? 'text-white' : ''
								}`}>
								{tag}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className='flex-shrink-0 p-4 mb-4'>
				<CustomSwitch
					label='Make Sphere Public'
					onCheck={handleVisibilityToggle}
					className=''
				/>
			</div>

			{/* Mobile Sidebar Button */}
			<button
				className='lg:hidden fixed top-4 left-4 z-50 p-2 text-white bg-cyan-400 rounded-full'
				onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? 'Close' : 'Open'} Sidebar
			</button>
		</div>
	);
};

export default Sidebar;
