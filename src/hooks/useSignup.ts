// src/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/auth/signup';
import axios from 'axios';
import { useContext } from 'react';
import StatusContext from '@/context/statusContext';

export const useSignup = () => {
	const context = useContext(StatusContext);

	if (!context) {
		throw new Error('useContext must be used within a Provider');
	}

	const { changeStatus } = context;
	return useMutation({
		mutationFn: signup,
		onSuccess: (response) => {
			console.log('Signed up successfully:', response);
			changeStatus('Signed up successfully', 'success');
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
