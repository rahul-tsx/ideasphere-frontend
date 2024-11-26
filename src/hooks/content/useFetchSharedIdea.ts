import { useQuery } from '@tanstack/react-query';
import { fetchIdea } from '@/api/content/content';


export const useFetchSharedIdea = (hash: string | null) => {
	return useQuery({
		queryKey: ['fetchidea', hash],
		queryFn: () => {
			if (!hash) {
				return Promise.reject(new Error('Hash is null or undefined'));
			}
			return fetchIdea(hash);
		},
		enabled: !!hash, 
		staleTime: Infinity,
	});
};