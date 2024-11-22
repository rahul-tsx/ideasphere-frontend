import { cn } from '@/lib/utils';
import { FC } from 'react';

type ButtonVariants = 'primary' | 'secondary';
interface CustomButtonProps {
	// label: string;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
	variant: ButtonVariants;
	size: 'sm' | 'md' | 'lg' | 'custom';
	classname?: string;
	onClick?: () => void;
}
const variantStyles = {
	primary:
		'bg-app_btn_primary_bg text-white hover:bg-app_btn_primary_hover_bg drop-shadow-xl  ',
	secondary:
		' bg-app_bg_secondary dark:bg-app_btn_secondary_bg  dark:text-white text-black hover:bg-app_btn_secondary_hover_bg hover:opacity-75 hover:dark:bg-app_btn_secondary_hover_bg hover:outline hover:outline-app_btn_primary_bg hover:outline-2 hover:dark:opacity-100 drop-shadow-xl ',
};
const sizeChart = {
	sm: 'px-3 py-2 min-w-[100px]',
	md: 'font-semibold px-5 py-2 text-lg min-w-[150px]',
	lg: 'font-bold px-10 py-4 text-xl min-w-[180px]',
	custom: '',
};
const CustomButton: FC<CustomButtonProps> = ({
	// label,
	type,
	onClick,
	size = 'sm',
	variant,
	children,
	classname,
}) => {
	return (
		<button
			type={type}
			className={cn(
				`px-5 py-2 my-1  rounded-lg ${variantStyles[variant]} ${sizeChart[size]}  `,
				size === 'custom' ? classname : ''
			)}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default CustomButton;
