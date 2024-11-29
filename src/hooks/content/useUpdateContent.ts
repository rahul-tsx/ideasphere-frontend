import { updateContent } from '@/api/content/content';
import { updateContentSchema } from '@/types/contentTypes';
import { useMutation } from '@tanstack/react-query';
import useStatus from '../useStatus';
import { useModal } from '../useModal';
import axios from 'axios';
import useTimestamp from '../auth/useTimestamp';

export const useUpdateContent = () => {
	
	const changeStatus = useStatus();
	const { closeModal } = useModal('updateContent');
	const { setTimestamp } = useTimestamp();

	return useMutation({
		mutationFn: ({
			contentData,
			contentId,
		}: {
			contentData: updateContentSchema;
			contentId: string;
		}) => updateContent(contentData, contentId),

		onSuccess: () => {
			changeStatus('Idea updated Successfully', 'success');
			closeModal();
			setTimestamp(Date.now());
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Idea not Updated';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
