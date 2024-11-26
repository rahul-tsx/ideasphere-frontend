import React from 'react';
import { ModeToggle } from './ThemeToggler';
import { useModal } from '@/hooks/useModal';
import Onboard from './Onboard';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/auth/useLogout';
import CustomButton from './ui/custom/CustomButton';

const Navbar: React.FC = () => {
	const { openModal } = useModal('onboard');
	const { loggedIn } = useAuthStore();
	const { mutate: logout, isPending } = useLogout();
	return (
		<>
			<nav className='bg-app_bg_primary text-app_text_primary sticky top-0 z-[50] '>
				<header className='py-6 px-10 border-b border-app_border_color '>
					<div className='mx-auto flex justify-between items-center'>
						<Link
							to={'/'}
							className='text-3xl font-bold'>
							IdeaSphere
						</Link>

						<div className='hidden md:flex space-x-8 items-center'>
							{loggedIn && (
								<CustomButton
									// label='Logout'
									type='button'
									size='md'
									variant='primary'
									onClick={() => logout()}>
									{isPending ? 'Logging Out...' : 'Logout'}
								</CustomButton>
							)}
							{!loggedIn && (
								<CustomButton
									type='button'
									size='md'
									variant='primary'
									onClick={openModal}
									classname=''>
									Login
								</CustomButton>
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
