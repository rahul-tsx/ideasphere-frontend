import { useModal } from '@/hooks/useModal';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ReactNode,
	createContext,
	useEffect,
	useRef,
	useState,
	forwardRef,
} from 'react';

interface ModalContextType {
	modals: { [key: string]: boolean }; // Stores modal open/close state
	modalData: { [key: string]: { data?: any } }; // Stores modal open/close state
	openModal: <T = void>(id: string, data?: T) => void; // Conditional data argument for openModal
	closeModal: (id: string) => void; // Closes the modal by id
}

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	// const [modals, setModals] = useState<{ [key: string]: boolean }>({});

	// const openModal = (id: string) => {
	// 	setModals((prev) => ({ ...prev, [id]: true }));
	// };

	// const closeModal = (id: string) => {
	// 	setModals((prev) => ({ ...prev, [id]: false }));
	// };
	const [modalData, setModalData] = useState<{
		[key: string]: { data?: any };
	}>({});
	const [modals, setModals] = useState<{
		[key: string]: boolean;
	}>({});

	const openModal = <T = void,>(
		id: string,
		...args: T extends void ? [] : [T]
	) => {
		const data = args[0]; // Data is only present if `T` is not `void`
		setModals((prev) => ({
			...prev,
			[id]: true,
		}));
		setModalData((prev) => ({
			...prev,
			[id]: { data },
		}));
	};

	const closeModal = (id: string) => {
		setModals((prev) => ({
			...prev,
			[id]: false,
		}));
	};
	return (
		<ModalContext.Provider value={{ modals, openModal, closeModal, modalData }}>
			{children}
		</ModalContext.Provider>
	);
};

export function Modal({ children }: { children: ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = forwardRef<
	HTMLButtonElement,
	{ children: ReactNode; className?: string; modalId: string }
>(({ children, className, modalId }, ref) => {
	const { openModal } = useModal(modalId);

	return (
		<button
			ref={ref}
			className={cn(
				'px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden',
				className
			)}
			onClick={() => openModal()}>
			{children}
		</button>
	);
});
ModalTrigger.displayName = 'ModalTrigger';

const CloseIcon = ({ modalId }: { modalId: string }) => {
	const { closeModal } = useModal(modalId);
	return (
		<button
			onClick={closeModal}
			className='absolute top-14 right-[-50px] group z-[50] hidden md:block bg-white rounded-r-full p-4 shadow-lg border border-gray-200 dark:border-neutral-800 hover:scale-110 transition-transform '>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='text-black size-6 group-hover:scale-125 group-hover:rotate-3 transition duration-200'>
				<path
					stroke='none'
					d='M0 0h24v24H0z'
					fill='none'
				/>
				<path d='M18 6l-12 12' />
				<path d='M6 6l12 12' />
			</svg>
		</button>
	);
};

const CloseIcon2 = ({ modalId }: { modalId: string }) => {
	const { closeModal } = useModal(modalId);
	return (
		<button
			onClick={() => closeModal()}
			className='absolute top-4 right-4 group'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='text-black dark:text-white size-8 md:hidden group-hover:scale-125 group-hover:rotate-3 transition duration-200'>
				<path
					stroke='none'
					d='M0 0h24v24H0z'
					fill='none'
				/>
				<path d='M18 6l-12 12' />
				<path d='M6 6l12 12' />
			</svg>
		</button>
	);
};
export const ModalBody = ({
	children,
	className,
	modalId,
	modalSize,
}: {
	children: ReactNode;
	className?: string;
	modalId: string;
	modalSize?: string;
}) => {
	const { isOpen } = useModal(modalId);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	const modalRef = useRef(null);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
						backdropFilter: 'blur(10px)',
					}}
					exit={{
						opacity: 0,
						backdropFilter: 'blur(0px)',
					}}
					className='fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-[55]'>
					<Overlay />
					<motion.div
						className={cn(
							'min-h-[50%] max-h-[90%]  md:max-w-[60%] 2xl:max-w-[50%] flex flex-col flex-1 relative',
							modalSize
						)}>
						<motion.div
							ref={modalRef}
							className={cn(
								' bg-white  border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-[55] flex flex-col flex-1 overflow-hidden overflow-y-auto scrollbar-dark ',
								className
							)}
							initial={{
								opacity: 0,
								scale: 0.5,
								rotateX: 40,
								y: 40,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								rotateX: 0,
								y: 0,
							}}
							exit={{
								opacity: 0,
								scale: 0.8,
								rotateX: 10,
							}}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 15,
							}}>
							<CloseIcon2 modalId={modalId} />
							{children}
						</motion.div>
						<CloseIcon modalId={modalId} />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const ModalContent = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex flex-col flex-1 p-8 md:p-10', className)}>
			{children}
		</div>
	);
};

export const ModalFooter = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex justify-end p-4 bg-gray-100 ', className)}>
			{children}
		</div>
	);
};

const Overlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				backdropFilter: 'blur(10px)',
			}}
			exit={{
				opacity: 0,
				backdropFilter: 'blur(0px)',
			}}
			className={`fixed inset-0 h-full w-full bg-mybackground-dark bg-opacity-50 z-[50] ${className}`}></motion.div>
	);
};
