import { updateContent } from '@/api/content/content';
import { updateContentSchema } from '@/types/contentTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import { useModal } from '../useModal';
import axios from 'axios';

export const useUpdateContent = () => {
	const queryClient = useQueryClient();
	const changeStatus = useStatus();
	const { closeModal } = useModal('updateContent');

	return useMutation({
		mutationFn: ({
			contentData,
			contentId,
		}: {
			contentData: updateContentSchema;
			contentId: string;
		}) => updateContent(contentData, contentId),

		onSuccess: () => {
			changeStatus('Content updated Successfully', 'success');
			closeModal();
			queryClient.invalidateQueries({ queryKey: ['content'] });
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage =
					error.response.data.message || 'Content not created';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
