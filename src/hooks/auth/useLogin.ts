// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/auth/login';
import useStatus from '../useStatus';
import { useModal } from '../useModal';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { sphereStatus } from '@/api/content/share';

export const useLogin = () => {
	const changeStatus = useStatus();

	const { closeModal } = useModal('onboard');
	const { setLoggedIn, setUsername, setuserId, setSphereStatus } =
		useAuthStore();

	const navigate = useNavigate();
	return useMutation({
		mutationFn: login,
		onSuccess: async (response) => {
			changeStatus('Logged in successfully', 'success');

			setLoggedIn(true);
			setuserId(response.data._id);
			setUsername(response.data.username);
			try {
				const sphereResponse = await sphereStatus();
				setSphereStatus(sphereResponse.active);
			} catch (error) {
				changeStatus('Failed to fetch sphere status', 'error');
			}
			closeModal();
			navigate('/dashboard');
		},

		onError: (error) => {
			console.error('my error', error);
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
