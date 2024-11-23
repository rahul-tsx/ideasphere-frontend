// // src/hooks/useLogin.ts
// import { useMutation } from '@tanstack/react-query';
// import useStatus from '../useStatus';
// import axios from 'axios';
// import { createTag } from '@/api/auth/tags';

// export const useTags = () => {
// 	const changeStatus = useStatus();

// 	return useMutation({
// 		mutationFn: createTag,

// 		onError: (error) => {
// 			if (axios.isAxiosError(error) && error.response) {
// 				const errorMessage = error.response.data.message || 'Tag not created';
// 				// console.error('Login error:', errorMessage);
// 				changeStatus(errorMessage, 'error');
// 			} else {
// 				// console.error('An unexpected error occurred:', error);
// 				changeStatus('An unexpected error occurred:', 'error');
// 			}
// 		},
// 	});
// };

// src/hooks/useTags.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTag, getAllTags as fetchTags } from '@/api/auth/tags';
import useStatus from '../useStatus';
import axios from 'axios';


export const useTags = () => {
	const changeStatus = useStatus();
	const queryClient = useQueryClient();
	
	const {
		data: tags,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['tags'],
		queryFn: fetchTags,
	});


	const {
		mutate: createTagMutation,
		isPending: creatingTag,
		isError: creationError,
	} = useMutation({
		mutationFn: createTag,
		onError: (error) => {
			// Handle errors during tag creation
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Tag not created';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tags'] });
		},
	});

	return {
		tags,
		isTagsLoading: isLoading,
		isTagsError: isError,
		tagsError: error,
		createTag: createTagMutation,
		creatingTag,
		creationError,
	};
};
