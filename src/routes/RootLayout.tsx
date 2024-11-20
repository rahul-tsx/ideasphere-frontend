import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RootLayout = () => (
	<>
		<Navbar />
		<Outlet />
		<Footer />
	</>
);

export default RootLayout;
