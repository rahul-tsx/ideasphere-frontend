// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth/login';
import useStatus from './useStatus';
import { useModal } from './useModal';
import { redirect } from 'react-router-dom';

export const useLogin = () => {
	const changeStatus = useStatus();

	const { closeModal } = useModal('onboard');
	return useMutation({
		mutationFn: login,
		onSuccess: (response) => {
			console.log('Logged in successfully:', response);
			changeStatus('Logged in successfully', 'success');
			closeModal();

			redirect('/about');
		},

		onError: (error) => {
			console.error('Login failed:', error);
		},
	});
};
