import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CustomSwitch } from './ui/custom/CustomSwitch';
import { useToggleSphereVisibility } from '@/hooks/sphere/useToggleSphereVisibility';
import { IconType } from 'react-icons/lib';
import useMenuStore from '@/store/collapsibleMenuStore';
import useAuthStore from '@/store/authStore';

interface SidebarProps {
	sections: { label: string; icon: IconType }[];
}

const Sidebar: FC<SidebarProps> = ({ sections }) => {
	const { isSideBarOpen, setSideBarOpen } = useMenuStore();
	
	const { sphereStatus } = useAuthStore();
	const location = useLocation();
	const activeIndex = sections.findIndex(
		(tag) =>
			`${tag.label.toLowerCase()}` ===
			location.pathname.split('/').filter(Boolean).pop()
	);
	const { mutate: toggleVisibility } = useToggleSphereVisibility();
	const handleVisibilityToggle = (checked: boolean) => {
	
		toggleVisibility({ active: checked });
	};

	return (
		<>
			<div
				className={`flex-none flex flex-col h-[90vh]  bg-app_bg_secondary dark:bg-app_bg_secondary sticky top-24 
  ${isSideBarOpen ? 'block' : 'hidden'} 
  lg:block lg:w-[300px] md:w-[80px] md:block w-full`}>
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
							{sections.map((tag, index) => (
								<Link
									to={`${tag.label.toLowerCase()}`}
									key={index}
									onClick={() => setSideBarOpen(false)}
									className={`relative z-10 pl-10 h-12 space-x-5 flex items-center text-app_text_primary ${
										activeIndex === index
											? 'hover:text-app_text_primary '
											: 'hover:text-app_text_hover'
									}  text-lg font-semibold transition-all duration-300 ${
										activeIndex === index ? 'text-white' : ''
									}`}>
									<div className='md:flex items-center justify-center'>
										<tag.icon size={20} />
									</div>

									<p className='md:hidden lg:block block'>{tag.label}</p>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Toggle visibility */}
				<div className='flex-shrink-0 p-4 mb-4'>
					<CustomSwitch
						label='Make Sphere Public'
						defaultValue={sphereStatus}
						onCheck={handleVisibilityToggle}
						className=''
					/>
				</div>
			</div>
			{/* Mobile Sidebar Button */}
		</>
	);
};

export default Sidebar;
