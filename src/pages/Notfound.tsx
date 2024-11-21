import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Page Not Found - IdeaSphere';
	}, []);

	const handleRedirect = () => {
		navigate('/');
	};

	return (
		<div className='flex items-center justify-center h-screen bg-app_bg_primary text-app_text_primary '>
			<div className='text-center'>
				<h1 className='text-5xl font-bold'>404</h1>
				<p className='mt-4 text-lg'>
					{`Oops! The page you're looking for doesn't exist.`}
				</p>
				<button
					onClick={handleRedirect}
					className='mt-6 px-6 py-3 bg-app_btn_primary_bg text-black font-semibold rounded hover:bg-app_btn_primary_hover_bg'>
					Go Back to Home
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
