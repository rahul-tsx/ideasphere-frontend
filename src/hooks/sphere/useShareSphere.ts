import { shareSphere } from '@/api/content/share';
import { useQuery } from '@tanstack/react-query';

export const useShareSphere = () => {
	return useQuery({
		queryKey: ['SphereLink'],
		queryFn: () => shareSphere(),
		staleTime: Infinity,
	});
};
