import About from '@/components/About';
import Articles from '@/pages/Articles';
import Blogs from '@/pages/Blogs';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import NotFoundPage from '@/pages/Notfound';
import Podcasts from '@/pages/Podcasts';
import Shared from '@/pages/Shared';
import Tweets from '@/pages/Tweets';
import Youtube from '@/pages/Youtube';
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
								element: <Podcasts />,
							},
							{
								path: 'blogs',
								element: <Blogs />,
							},
							{
								path: 'articles',
								element: <Articles />,
							},
							{
								path: 'youtube',
								element: <Youtube />,
							},
							{
								path: 'shared',
								element: <Shared />,
							},
							{
								path: 'shared/:hash',
								element: <Shared />, // Handles /dashboard/shared/abc123
							},
							{
								path: 'shared/:username/:hash',
								element: <Shared />, // Handles /dashboard/shared/username/hash
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
