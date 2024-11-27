import { sphereStatus } from '@/api/content/share';
import { useQuery } from '@tanstack/react-query';

export const useFetchSphereStatus = () => {
	return useQuery({
		queryKey: ['SphereStatus'],
		queryFn: sphereStatus,
	});
};
