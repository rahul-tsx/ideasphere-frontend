import { useModal } from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
	const { openModal } = useModal('onboard');
	return (
		<div className='py-10 flex flex-col justify-center items-center  bg-app_bg_primary text-app_text_primary dark:bg-app_bg_inverse dark:text-app_text_primary_inverse'>
			{/* CTA Section */}
			<motion.div
				className='text-center max-w-3xl px-4 py-16'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}>
				<h1 className='text-5xl font-extrabold mb-6'>
					<h1>&#8216;Organize Your Ideas, All in One Sphere&#8217;</h1>
				</h1>
				<p className='text-lg text-app_text_secondary dark:text-app_text_secondary_inverse mb-8'>
					"Welcome to IdeaSphere – the ultimate tool for bookmarking,
					organizing, and sharing all your thoughts, links, and ideas. Keep all
					your inspirations and discoveries in one place, just a click away!"
				</p>
				<button
					className='px-8 py-4 text-xl font-semibold rounded-lg bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg drop-shadow-xl transform hover:scale-105 transition-transform'
					onClick={openModal}>
					Get Started Now
				</button>
			</motion.div>
			{/* Features Section */}
			<motion.div
				className='grid md:grid-cols-3 gap-8 mt-16 max-w-6xl px-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}>
				<div className='p-6 bg-app_bg_secondary dark:bgapp_bg_secondary_inverse rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Save Anything</h3>
					<p className='text-app_text_muted dark:text-app_text_muted_inverse'>
						Bookmark links, tweets, articles, blogs, podcasts, and more in a few
						clicks.
					</p>
				</div>
				<div className='p-6 bg-app_bg_secondary dark:bgapp_bg_secondary_inverse rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Find Instantly</h3>
					<p className='text-app_text_muted dark:text-app_text_muted_inverse'>
						Use tags and categories to quickly find and organize your saved
						content.
					</p>
				</div>
				<div className='p-6 bg-app_bg_secondary dark:bgapp_bg_secondary_inverse rounded-lg shadow-lg'>
					<h3 className='text-xl font-bold mb-4'>Share Your Sphere</h3>
					<p className='text-app_text_muted dark:text-app_text_muted_inverse'>
						Invite your friends and collaborate by sharing your knowledge.
					</p>
				</div>
			</motion.div>

			{/* About Section */}
			<motion.div
				className='mt-16 max-w-4xl px-4 text-center'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}>
				<h2 className='text-3xl font-bold mb-4'>Why IdeaSphere?</h2>
				<p className='text-app_text_secondary dark:text-app_text_secondary_inverse'>
					In a world full of information, keeping track of everything can be
					overwhelming. IdeaSphere makes it easy to collect, organize, and
					retrieve your ideas, making your life more productive.
				</p>
			</motion.div>
		</div>
	);
};

export default Home;
