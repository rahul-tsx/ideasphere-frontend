import { copyIdea } from '@/api/content/content';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';

export const useCopySharedContent = () => {
	const queryClient = useQueryClient();
	const changeStatus = useStatus();

	return useMutation({
		mutationFn: ({ hash }: { hash: string }) => copyIdea(hash),

		onSuccess: () => {
			changeStatus('Idea copied Successfully', 'success');
			queryClient.invalidateQueries({ queryKey: ['content'] });
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Idea not Copied';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
