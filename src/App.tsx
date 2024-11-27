import { FC } from 'react';
import { Modal } from './components/ui/animated-modal';
import { Toaster } from 'sonner';
import useCheckAuth from './hooks/auth/useCheckAuth';



type AppProps = unknown;

const App: FC<AppProps> = () => {
	const { isLoading } = useCheckAuth();
	

	if (isLoading ) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Modal>
				<Toaster />
			</Modal>
		</>
	);
};

export default App;
