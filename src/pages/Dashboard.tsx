import AddContentModal from '@/components/AddContentModal';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import CustomButton from '@/components/ui/custom/CustomButton';
import UpdateContentModal from '@/components/UpdateContentModal';
import { useShareSphere } from '@/hooks/sphere/useShareSphere';

import { useModal } from '@/hooks/useModal';
import useStatus from '@/hooks/useStatus';
import { generateLink } from '@/lib/utility/generateLink';
import useAuthStore from '@/store/authStore';
import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Outlet, useLocation } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const { username } = useAuthStore();
	const { openModal } = useModal('addContent');
	const { pathname } = useLocation();
	const { data } = useShareSphere();
	const pathSegments = pathname.split('/').filter(Boolean);
	const isShared = pathSegments.includes('shared');
	const changeStatus = useStatus();
	const sphereLink = generateLink({
		pathname: 'dashboard/shared',
		param: data,
	});

	return (
		<div className='bg-app_bg_primary flex gap-x-1'>
			<Sidebar
				tags={['Tweets', 'Podcasts', 'Blogs', 'Articles', 'Youtube', 'Shared']}
			/>
			<div className='w-full'>
				<div className='flex-1 p-5 pl-10 pb-10  gap-y-5 flex flex-col'>
					{!isShared && (
						<div className='flex justify-between gap-x-5 items-center'>
							<p className='font-bold text-2xl'>Welcome {username}</p>

							<div className='flex gap-x-10'>
								<CustomButton
									type='button'
									size='md'
									variant='primary'
									classname=''
									onClick={() => openModal()}>
									Add Content
								</CustomButton>
								<CopyToClipboard
									text={sphereLink}
									onCopy={() =>
										changeStatus(
											'Sphere Url Copied to Clipboard you can now share it with your peers',
											'success'
										)
									}>
									<CustomButton
										type='button'
										size='md'
										variant='secondary'
										classname=''>
										Share Sphere
									</CustomButton>
								</CopyToClipboard>
							</div>
						</div>
					)}
					<Outlet />
				</div>
				<Footer />
			</div>

			<AddContentModal />
			<UpdateContentModal />
		</div>
	);
};

export default Dashboard;
