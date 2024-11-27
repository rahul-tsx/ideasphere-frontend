import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RootLayout = () => {
	const location = useLocation();
	
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const isDashboard = pathSegments.includes('dashboard');
	return (
		<>
			<Navbar />
			<Outlet />
			{!isDashboard && <Footer />}
		</>
	);
};

export default RootLayout;
