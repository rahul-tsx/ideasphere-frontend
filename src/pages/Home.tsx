import { useModal } from '@/hooks/useModal';
import useAuthStore from '@/store/authStore';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
	const { openModal } = useModal('onboard');
	const { loggedIn } = useAuthStore();
	const navigate = useNavigate();
	const handleStartUp = () => {
		if (loggedIn) {
			console.log('Hello');
			navigate('/dashboard');
		} else {
			openModal();
		}
	};
	return (
		<div className='pb-10 flex flex-col gap-10 justify-center items-center  bg-app_bg_primary text-app_text_primary '>
			{/* CTA Section */}
			<div className='w-full bg-app_bg_secondary items-center flex justify-center'>
				<motion.div
					className='text-center max-w-3xl px-4 py-16'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}>
					<h1 className='text-5xl font-extrabold mb-6'>
						&#8216;Organize Your Ideas, All in One Sphere&#8217;
					</h1>
					<p className='text-lg text-app_text_secondary  mb-8'>
						"Welcome to IdeaSphere – the ultimate tool for bookmarking,
						organizing, and sharing all your thoughts, links, and ideas. Keep
						all your inspirations and discoveries in one place, just a click
						away!"
					</p>
					<button
						className='px-8 py-4 text-xl font-semibold rounded-lg bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg drop-shadow-xl transform hover:scale-105 transition-transform'
						onClick={handleStartUp}>
						Get Started Now
					</button>
				</motion.div>
			</div>

			{/* Features Section */}
			<motion.div
				className='grid md:grid-cols-3 gap-8  max-w-6xl px-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}>
				<div className='p-6 bg-app_bg_secondary  rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Save Anything</h3>
					<p className='text-app_text_muted '>
						Bookmark links, tweets, articles, blogs, podcasts, and more in a few
						clicks.
					</p>
				</div>
				<div className='p-6 bg-app_bg_secondary  rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Find Instantly</h3>
					<p className='text-app_text_muted '>
						Use tags and categories to quickly find and organize your saved
						content.
					</p>
				</div>
				<div className='p-6 bg-app_bg_secondary  rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Share Your Sphere</h3>
					<p className='text-app_text_muted '>
						Invite your friends and collaborate by sharing your knowledge.
					</p>
				</div>
			</motion.div>

			{/* About Section */}
			<div className='w-full bg-app_bg_secondary items-center flex justify-center '>
				<motion.div
					className='my-8 max-w-4xl px-4 text-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}>
					<h2 className='text-3xl font-bold mb-4'>Why IdeaSphere?</h2>
					<p className='text-app_text_secondary '>
						In a world full of information, keeping track of everything can be
						overwhelming. IdeaSphere makes it easy to collect, organize, and
						retrieve your ideas, making your life more productive.
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Home;
