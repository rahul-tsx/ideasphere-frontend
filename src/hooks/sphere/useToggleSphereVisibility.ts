import { sphereStatus } from './../../api/content/share';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStatus from '../useStatus';
import axios from 'axios';
import { toggleSphereVisibility } from '@/api/content/share';
import useAuthStore from '@/store/authStore';

export const useToggleSphereVisibility = () => {
	const changeStatus = useStatus();
	const queryClient = useQueryClient();
	const { setSphereStatus } = useAuthStore();

	return useMutation({
		mutationFn: ({ active }: { active: boolean }) =>
			toggleSphereVisibility(active),

		onSuccess: (response) => {
			const active = response.active;
			setSphereStatus(active);
			changeStatus(
				`Sphere made ${active ? 'Public' : 'Private'} Successfully`,
				'success'
			);
			queryClient.invalidateQueries({ queryKey: ['sphereStatus'] });
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
