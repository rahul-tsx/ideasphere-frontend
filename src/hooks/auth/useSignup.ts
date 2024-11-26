// src/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../api/auth/signup';
import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { useModal } from '../useModal';
import { useNavigate } from 'react-router-dom';
import useStatus from '../useStatus';

export const useSignup = () => {
	const changeStatus = useStatus();
	const { setLoggedIn, setUsername, setuserId } = useAuthStore();
	const { closeModal } = useModal('onboard');
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: (response) => {
			changeStatus('Signed up successfully', 'success');
			setuserId(response.data._id);
			setUsername(response.data.username);
			closeModal();
			setLoggedIn(true);
			navigate('/dashboard');
		},
		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Signup failed';
				console.error('Signup error:', errorMessage);
				changeStatus(errorMessage, 'error');
			} else {
				console.error('An unexpected error occurred:', error);
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
