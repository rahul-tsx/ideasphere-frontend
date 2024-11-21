// src/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../api/auth/signup';
import axios from 'axios';
import { useContext } from 'react';
import StatusContext from '@/context/statusContext';
import useAuthStore from '@/store/authStore';
import { useModal } from '../useModal';
import { redirect, useNavigate } from 'react-router-dom';

export const useSignup = () => {
	const context = useContext(StatusContext);

	if (!context) {
		throw new Error('useContext must be used within a Provider');
	}

	const { changeStatus } = context;
	const { setLoggedIn } = useAuthStore();
	const { closeModal } = useModal('onboard');
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: () => {
			changeStatus('Signed up successfully', 'success');
			closeModal();
			setLoggedIn(true);
			navigate('/about');
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
