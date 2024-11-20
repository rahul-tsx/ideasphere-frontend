import { FieldError } from 'react-hook-form';

interface CustomInputProps {
	label: string;
	name: string; // Generic field name from form schema T
	// register: UseFormRegister<FieldValues>; // Register with the generic type T
	error?: FieldError;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
}

const CustomInput = ({
	label,
	name,
	// register,
	error,
	className = '',
	...rest
}: CustomInputProps) => {
	return (
		<div>
			<label
				htmlFor={name}
				className='block  font-medium text-app_text_primary'>
				{label}
			</label>
			<input
				id={name as string}
				className={`w-full p-2 border border-gray-300 rounded-lg text-app_text_primary_inverse ${className}`}
				{...rest}
			/>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
};

export default CustomInput;
