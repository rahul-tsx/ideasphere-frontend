import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes: FC = () => {
	const authenticated = useAuthStore((state) => state.loggedIn);
	const { openModal } = useModal('onboard');

	useEffect(() => {
		if (!authenticated) {
			openModal();
		}
	}, [authenticated]);

	if (!authenticated) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};

export default PrivateRoutes;
