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
			className='bg-app_bg_primary text-app_text_primary'>
			{/* Toggler Section */}
			<div className='w-full grid grid-cols-2'>
				<motion.button
					onClick={toggleForm}
					className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
						!isSignup
							? 'bg-app_bg_primary border-app_bg_secondary border-b-2'
							: 'bg-gray-200 text-gray-700'
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
					className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
						isSignup
							? 'bg-app_bg_primary border-app_bg_secondary border-b-2'
							: 'bg-gray-200 text-gray-700'
					}`}
					initial={{ scale: 1 }}
					animate={{ scale: isSignup ? 1.05 : 1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
					Sign Up
				</motion.button>
			</div>
			<ModalContent>
				<div className='w-full max-w-xl mx-auto bg-app_bg_primary p-6'>
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
