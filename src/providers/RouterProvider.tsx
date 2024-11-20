import About from '@/components/About';
import Home from '@/components/Home';
import RootLayout from '@/routes/RootLayout';
import {
	createBrowserRouter,
	RouterProvider as RouteProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		// loader: rootLoader,
		children: [
			{
				path: '/',
				element: <Home />,
				// loader: teamLoader,
			},
			{ path: '/about', element: <About /> },
		],
	},
]);
const RouterProvider = () => {
	return (
		<>
			{' '}
			<RouteProvider
				router={router}
				// context={{ loggedIn: authenticated }}
			/>
		</>
	);
};

export default RouterProvider;
