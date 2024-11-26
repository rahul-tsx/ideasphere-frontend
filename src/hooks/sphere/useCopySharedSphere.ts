import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import { copySphere } from '@/api/content/share';

export const useCopySharedSphere = () => {
	const queryClient = useQueryClient();
	const changeStatus = useStatus();

	return useMutation({
		mutationFn: ({ username, hash }: { username: string; hash: string }) =>
			copySphere(username, hash),

		onSuccess: () => {
			changeStatus('Sphere copied Successfully', 'success');
			queryClient.invalidateQueries({ queryKey: ['content'] });
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Sphere not Copied';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
