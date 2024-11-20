import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '@/api/auth/checkAuth';

const useCheckAuth = () => {
	return useQuery({ queryKey: ['CheckAuthStatus'], queryFn: checkAuth });
};

export default useCheckAuth;
