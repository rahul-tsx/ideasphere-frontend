// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import useStatus from '../useStatus';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/auth/logout';
import useAuthStore from '@/store/authStore';

export const useLogout = () => {
	const changeStatus = useStatus();
	const { setLoggedIn } = useAuthStore();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			navigate('/');
			changeStatus('Logged Out successfully', 'success');
			setLoggedIn(false);
		},

		onError: (error) => {
			console.error('Logout failed:', error);
			changeStatus('Logged Out Failed', 'error');
		},
	});
};
