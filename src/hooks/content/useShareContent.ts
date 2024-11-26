import { useQuery } from '@tanstack/react-query';
import { shareIdea } from '@/api/content/content';

export const useShareContent = (contentId: string) => {
	return useQuery({
		queryKey: ['shareableUrl', contentId],
		queryFn: () => shareIdea(contentId),

		enabled: !!contentId, 
		staleTime: Infinity, 
	});
};
