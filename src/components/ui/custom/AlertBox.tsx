import { FC } from 'react';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import CustomButton from './CustomButton';

interface AlertBoxProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

const AlertBox: FC<AlertBoxProps> = ({
	open,
	title,
	description,
	setOpen,
	onConfirm,
	onCancel,
}) => {
	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		setOpen(false);
	};

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};
	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}>
			<AlertDialogContent className='bg-app_bg_secondary'>
				<AlertDialogHeader>
					<AlertDialogTitle className='font-bold'>{title}</AlertDialogTitle>
					<AlertDialogDescription className='text-red-500 font-semibold'>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<CustomButton
							variant='secondary'
							onClick={handleCancel}
							size='md'
							type='button'>
							Cancel
						</CustomButton>
					</AlertDialogCancel>

					<CustomButton
						variant='primary'
						onClick={handleConfirm}
						size='md'
						type='button'>
						Continue
					</CustomButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertBox;
