import React from 'react';
import { ModeToggle } from './ThemeToggler';
import { useModal } from '@/hooks/useModal';
import Onboard from './Onboard';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar: React.FC = () => {
	const { openModal } = useModal('onboard');
	return (
		<>
			<nav className='bg-app_bg_primary dark:bg-app_bg_inverse text-app_text_primary p-4'>
				<header className='py-6 border-b border-app_border_color dark:border-app_border_color_inverse'>
					<div className='container mx-auto flex justify-between items-center'>
						<h1 className='text-3xl font-bold'>IdeaSphere</h1>
						<div className='hidden md:flex space-x-6'>
							<Link
								to={'/'}
								className='hover:text-gray-400'>
								Home
							</Link>
							{/* <Link
							to='/courses'
							className='hover:text-gray-400'>
							Courses
						</Link> */}
							<Link
								to='/about'
								className='hover:text-gray-400'>
								About
							</Link>
						</div>

						<div className='hidden md:flex space-x-4'>
							<button
								className='px-4 py-2 rounded-lg bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg'
								onClick={openModal}>
								Login
							</button>

							<ModeToggle />
						</div>
						<div className='md:hidden'>
							<button className='text-app_text_primary focus:outline-none'>
								<RxHamburgerMenu size={35} />
							</button>
						</div>
					</div>
				</header>
			</nav>
			<Onboard />
		</>
	);
};

export default Navbar;
