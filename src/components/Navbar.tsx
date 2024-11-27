import React from 'react';
import { ModeToggle } from './ThemeToggler';
import { useModal } from '@/hooks/useModal';
import Onboard from './Onboard';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import useAuthStore from '@/store/authStore';
import { useLogout } from '@/hooks/auth/useLogout';
import CustomButton from './ui/custom/CustomButton';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import useMenuStore from '@/store/collapsibleMenuStore';

const Navbar: React.FC = () => {
	const { openModal } = useModal('onboard');
	const { loggedIn } = useAuthStore();
	const { mutate: logout, isPending } = useLogout();
	const { setSideBarOpen, isSideBarOpen, isNavbarOpen, setNavbarOpen } =
		useMenuStore();

	const toggleNavbar = () => setNavbarOpen(!isNavbarOpen);
	const toggleSidebar = () => setSideBarOpen(!isSideBarOpen);

	return (
		<>
			<nav className='bg-app_bg_primary text-app_text_primary sticky top-0 z-[50]'>
				<header className='py-6 px-10 border-b border-app_border_color'>
					<div className='mx-auto flex justify-between items-center'>
						{/* Sidebar Toggle */}
						{loggedIn && (
							<div className='md:hidden'>
								<button
									className='text-app_text_primary focus:outline-none'
									onClick={toggleSidebar}>
									{isSideBarOpen ? (
										<GoSidebarCollapse size={35} />
									) : (
										<GoSidebarExpand size={35} />
									)}
								</button>
							</div>
						)}

						{/* Logo */}
						<Link
							to='/'
							className='text-3xl font-bold'>
							IdeaSphere
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden md:flex space-x-8 items-center'>
							{loggedIn && (
								<CustomButton
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
									onClick={openModal}>
									Login
								</CustomButton>
							)}
							<ModeToggle />
						</div>

						{/* Mobile Navigation Toggle */}
						<div className='md:hidden'>
							<button
								className='text-app_text_primary focus:outline-none'
								onClick={toggleNavbar}>
								<RxHamburgerMenu size={35} />
							</button>
						</div>
					</div>
				</header>

				{/* Mobile Navigation */}
				{isNavbarOpen && (
					<div className='md:hidden bg-app_bg_secondary text-app_text_primary py-4 px-8'>
						<div className='flex flex-col space-y-4'>
							{loggedIn && (
								<CustomButton
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
									onClick={openModal}>
									Login
								</CustomButton>
							)}
							<div className='flex justify-center'>
								<ModeToggle />
							</div>
						</div>
					</div>
				)}
			</nav>
			<Onboard />
		</>
	);
};

export default Navbar;
