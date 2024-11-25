import { deleteContent } from '@/api/content/content';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';

export const useDeleteContent = () => {
	const queryClient = useQueryClient();
	const changeStatus = useStatus();

	return useMutation({
		mutationFn: ({ contentId }: { contentId: string }) =>
			deleteContent(contentId),

		onSuccess: () => {
			changeStatus('Idea Deleted Successfully', 'success');
			queryClient.invalidateQueries({ queryKey: ['content'] });
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Idea not Deleted';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
