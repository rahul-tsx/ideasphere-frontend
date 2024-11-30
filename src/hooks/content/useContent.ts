import { useMutation, useQuery } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import { addContent, getAllContent } from '@/api/content/content';
import { useModal } from '../useModal';
import useTimestamp from '../useTimestamp';

export const useContent = () => {
	const changeStatus = useStatus();

	const { closeModal } = useModal('addContent');
	const { timestamp, setTimestamp } = useTimestamp();

	const {
		data: content,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['content', timestamp],
		queryFn: getAllContent,
	});

	const {
		mutate: createContent,
		isPending: creatingContent,
		isError: contentCreationError,
	} = useMutation({
		mutationFn: addContent,
		onError: (error) => {
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
			changeStatus('Content Added Successfully', 'success');
			setTimestamp(Date.now());
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
