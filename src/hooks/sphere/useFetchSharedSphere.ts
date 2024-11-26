import { useQuery } from '@tanstack/react-query';
import { fetchSphere } from '@/api/content/share';

export const useFetchSharedSphere = (
	username: string | null,
	hash: string | null
) => {
	return useQuery({
		queryKey: ['fetchSphere', hash],
		queryFn: () => {
			if (!hash) {
				return Promise.reject(new Error('Hash is null or undefined'));
			}
			if (!username) {
				return Promise.reject(new Error('Username is null or undefined'));
			}
			return fetchSphere(username, hash);
		},
		enabled: !!hash,
		staleTime: Infinity,
	});
};
