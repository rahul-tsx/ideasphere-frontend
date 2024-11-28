import { FC, useEffect, useState } from 'react';
import { ModalProvider } from '@/components/ui/animated-modal';
import StatusContext from '@/context/statusContext';
import { toast } from 'sonner';
import { CgClose } from 'react-icons/cg';
import { statusObj, variantTypes } from '@/types/utilityTypes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouterProvider from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
interface ProviderProps {
	children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
	const [status, setStatus] = useState<statusObj | null>(null);
	const changeStatus = (
		message: string,
		variant: variantTypes = 'default',
		
		
	) => {
		setStatus({ msg: message, variant });
	};
	useEffect(() => {
		if (status) {
			switch (status.variant) {
				case 'success':
					toast.success(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},

						style: {
							backgroundColor: 'black',
							color: '#4caf50',
						},
					});
					break;

				case 'error':
					toast.error(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: '#f44336',
						},
					});
					break;
				case 'warning':
					toast.error(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: 'orange',
						},
					});
					break;

				default:
					toast(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: 'white',
						},
					});
					break;
			}

			const timeout = setTimeout(() => {
				setStatus(null);
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [status, setStatus]);
	const queryClient = new QueryClient();
	return (
		<>
			<StatusContext.Provider value={{ status, changeStatus }}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider
						defaultTheme='dark'
						storageKey='vite-ui-theme'>
						<ModalProvider>
							{children}
							<RouterProvider />
						</ModalProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</StatusContext.Provider>
		</>
	);
};

export default Provider;
