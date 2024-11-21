import React from 'react';
import { ModeToggle } from './ThemeToggler';
import { useModal } from '@/hooks/useModal';
import Onboard from './Onboard';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/auth/useLogout';

const Navbar: React.FC = () => {
	const { openModal } = useModal('onboard');
	const { loggedIn } = useAuthStore();
	const { mutate: logout, isPending } = useLogout();
	return (
		<>
			<nav className='bg-app_bg_primary text-app_text_primary '>
				<header className='py-6 px-10 border-b border-app_border_color '>
					<div className='container mx-auto flex justify-between items-center'>
						<Link
							to={'/'}
							className='text-3xl font-bold'>
							IdeaSphere
						</Link>
						<div className='hidden md:flex space-x-6'></div>

						<div className='hidden md:flex space-x-4'>
							{loggedIn && (
								<button
									className='px-4 py-2 rounded-lg bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg'
									onClick={() => logout()}>
									{isPending ? 'Logging Out...' : 'Logout'}
								</button>
							)}
							{!loggedIn && (
								<button
									className='px-4 py-2 rounded-lg bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg'
									onClick={openModal}>
									Login
								</button>
							)}

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
