import useAuthStore from '@/store/authStore';
import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes: FC = () => {
	const authenticated = useAuthStore((state) => state.loggedIn);
	console.log(authenticated);

	return <>{authenticated ? <Outlet /> : <Navigate to='/' />}</>;
};
export default PrivateRoutes;
