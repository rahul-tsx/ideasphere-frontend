import { deleteContent } from '@/api/content/content';

import { useMutation } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import useTimestamp from '../useTimestamp';

export const useDeleteContent = () => {
	const { setTimestamp } = useTimestamp();
	const changeStatus = useStatus();

	return useMutation({
		mutationFn: ({ contentId }: { contentId: string }) =>
			deleteContent(contentId),

		onSuccess: () => {
			changeStatus('Idea Deleted Successfully', 'success');
			setTimestamp(Date.now());
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
