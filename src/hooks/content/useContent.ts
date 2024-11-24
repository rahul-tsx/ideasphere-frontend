import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import { addContent, getAllContent } from '@/api/content/content';
import { useModal } from '../useModal';

export const useContent = () => {
	const changeStatus = useStatus();
	const queryClient = useQueryClient();
	const { closeModal } = useModal('addContent');

	const {
		data: content,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['content'],
		queryFn: getAllContent,
	});

	const {
		mutate: createContent,
		isPending: creatingContent,
		isError: contentCreationError,
	} = useMutation({
		mutationFn: addContent,
		onError: (error) => {
			// Handle errors during tag creation
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage =
					error.response.data.message || 'Content not created';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
		onSuccess: () => {
			closeModal();
			queryClient.invalidateQueries({ queryKey: ['content'] });
		},
	});

	return {
		content,
		isContentLoading: isLoading,
		isContentError: isError,
		contentError: error,
		createContent,
		creatingContent,
		contentCreationError,
	};
};
