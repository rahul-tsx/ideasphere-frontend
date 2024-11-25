import AddContentModal from '@/components/AddContentModal';
import Sidebar from '@/components/Sidebar';
import CustomButton from '@/components/ui/custom/CustomButton';
import UpdateContentModal from '@/components/updateContentModal';
import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
	const { username } = useAuthStore();
	const { openModal } = useModal('addContent');
	return (
		<div className='bg-app_bg_primary flex gap-x-10'>
			<Sidebar
				tags={['Tweets', 'Podcasts', 'Blogs', 'Articles', 'Youtube', 'Friends']}
			/>

			<div className='flex-1 p-5 gap-y-5 flex flex-col'>
				<div className='flex justify-between gap-x-5'>
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
						<CustomButton
							type='button'
							size='md'
							variant='secondary'
							classname=''>
							Share Sphere
						</CustomButton>
					</div>
				</div>
				<Outlet />
			</div>

			<AddContentModal />
			<UpdateContentModal />
		</div>
	);
};

export default Dashboard;
