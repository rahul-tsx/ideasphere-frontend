import About from '@/components/About';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import NotFoundPage from '@/pages/Notfound';
import Tweets from '@/components/Tweets';
import PrivateRoutes from '@/routes/PrivateRoutes';
import RootLayout from '@/routes/RootLayout';
import {
	createBrowserRouter,
	Navigate,
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
			{
				path: '/dashboard',
				element: <PrivateRoutes />,
				children: [
					{
						path: '',
						element: <Dashboard />,

						children: [
							{
								path: '',
								element: (
									<Navigate
										to='tweets'
										replace
									/>
								),
							},
							{
								path: 'tweets',
								element: <Tweets />,
							},
							{
								path: 'podcasts',
								element: <Tweets />,
							},
							{
								path: 'blogs',
								element: <Tweets />,
							},
							{
								path: 'articles',
								element: <Tweets />,
							},
							{
								path: 'youtube',
								element: <Tweets />,
							},
							{
								path: 'friends',
								element: <Tweets />,
							},
						],
					},
					{ path: '*', element: <NotFoundPage /> },
				],
			},
		],
	},
	{ path: '*', element: <NotFoundPage /> },
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
