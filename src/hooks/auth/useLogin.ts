// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth/login';
import useStatus from '../useStatus';
import { useModal } from '../useModal';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import axios from 'axios';

export const useLogin = () => {
	const changeStatus = useStatus();

	const { closeModal } = useModal('onboard');
	const { setLoggedIn } = useAuthStore();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: login,
		onSuccess: () => {
			changeStatus('Logged in successfully', 'success');
			setLoggedIn(true);
			closeModal();
			navigate('/about');
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Login failed';
				// console.error('Login error:', errorMessage);
				changeStatus(errorMessage, 'error');
			} else {
				// console.error('An unexpected error occurred:', error);
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
