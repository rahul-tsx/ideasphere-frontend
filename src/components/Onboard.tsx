import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalBody, ModalContent } from './ui/animated-modal';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

interface OnboardProps {}

const Onboard: FC<OnboardProps> = () => {
	const [isSignup, setIsSignup] = useState(false);

	const toggleForm = () => {
		setIsSignup(!isSignup);
	};

	return (
		<ModalBody
			modalId='onboard'
			className='bg-app_bg_secondary  text-app_text_primary'>
			{/* Toggler Section */}
			{/* <div className='w-full grid grid-cols-2 text-lg font-semibold'>
				<motion.button
					onClick={toggleForm}
					className={`px-4 py-2 rounded-lg transition-all duration-300 ${
						!isSignup
							? 'bg-app_btn_primary_bg  text-app_text_primary_inverse '
							: 'bg-app_bg_secondary '
					}`}
					initial={{ scale: 1 }}
					animate={{
						scale: !isSignup ? 1.05 : 1,
						// opacity: !isSignup ? 1 : 0.7,
					}}
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
					Login
				</motion.button>

				<motion.button
					onClick={toggleForm}
					className={`px-4 py-2 rounded-lg transition-all duration-300 ${
						isSignup
							? 'bg-app_btn_primary_bg  text-app_text_primary_inverse '
							: 'bg-app_bg_secondary '
					}`}
					initial={{ scale: 1 }}
					animate={{ scale: isSignup ? 1.05 : 1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
					Sign Up
				</motion.button>
			</div> */}
			<div className='relative w-full grid grid-cols-2 text-lg font-semibold'>
				{/* Highlight Background */}
				<motion.div
					className='absolute top-0 left-0 h-full w-1/2 rounded-lg bg-app_btn_primary_bg'
					animate={{
						x: isSignup ? '100%' : '0%',
					}}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 20,
					}}
				/>

				{/* Login Button */}
				
				<button
					onClick={toggleForm}
					className={`z-10 px-4 py-2 rounded-lg transition-all duration-300 ${
						!isSignup
							? 'text-app_text_primary_inverse'
							: 'text-app_text_primary'
					}`}>
					Login
				</button>

				{/* Signup Button */}
				<button
					onClick={toggleForm}
					className={`z-10 px-4 py-2 rounded-lg transition-all duration-300 ${
						isSignup ? 'text-app_text_primary_inverse' : 'text-app_text_primary'
					}`}>
					Signup
				</button>
			</div>
			<ModalContent>
				<div className='w-full max-w-xl mx-auto bg-app_bg_secondary p-6'>
					<AnimatePresence mode='wait'>
						{isSignup ? (
							<motion.div
								key='signup'
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.2 }}>
								<SignupForm />
							</motion.div>
						) : (
							<motion.div
								key='login'
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.2 }}>
								<LoginForm />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</ModalContent>
		</ModalBody>
	);
};

export default Onboard;
