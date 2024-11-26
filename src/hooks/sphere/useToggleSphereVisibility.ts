import { useMutation } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import { toggleSphereVisibility } from '@/api/content/share';

export const useToggleSphereVisibility = () => {
	const changeStatus = useStatus();

	return useMutation({
		mutationFn: ({ active }: { active: boolean }) =>
			toggleSphereVisibility(active),

		onSuccess: (response) => {
			const active = response.active;
			console.log('active', active);
			changeStatus(
				`Sphere made ${active ? 'Public' : 'Private'} Successfully`,
				'success'
			);
		},

		onError: (error) => {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Error';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		},
	});
};
