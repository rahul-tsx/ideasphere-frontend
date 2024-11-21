import PasswordInput from './PasswordInput';
import RadioInput from './RadioInput';
import CheckboxInput from './CheckBoxInput';
import FileInput from './FileInput';
import { FieldError } from 'react-hook-form';

interface Option {
	label: string;
	value: string;
}

interface CustomInputProps {
	label?: string;
	name: string;
	variant: 'normal' | 'hidden' | 'radio' | 'checkbox' | 'file';
	options?: Option[];
	error?: FieldError;
	className?: string;
	[x: string]: any;
}

const CustomInput = ({
	label,
	name,
	variant,
	options = [],
	error,
	className = '',
	...rest
}: CustomInputProps) => {
	let InputComponent;

	switch (variant) {
		case 'hidden':
			InputComponent = (
				<PasswordInput
					name={name}
					error={error}
					{...rest}
				/>
			);
			break;
		case 'radio':
			InputComponent = (
				<RadioInput
					name={name}
					options={options}
					error={error}
					{...rest}
				/>
			);
			break;
		case 'checkbox':
			InputComponent = (
				<CheckboxInput
					name={name}
					options={options}
					error={error}
					{...rest}
				/>
			);
			break;
		case 'file':
			InputComponent = (
				<FileInput
					name={name}
					error={error}
					{...rest}
				/>
			);
			break;
		default:
			InputComponent = (
				<>
					<input
						id={name}
						name={name}
						type='text'
						className={`w-full text-app_text_secondary dark:text-app_text_secondary_inverse p-2 border border-app_btn_primary_bg rounded-lg font-semibold outline-none  ${className}`}
						{...rest}
					/>
					{error && <p className='text-red-500 text-sm'>{error.message}</p>}
				</>
			);
			break;
	}

	return (
		<div className='mb-4'>
			{variant !== 'file' && label && (
				<label
					htmlFor={name}
					className='block font-medium text-app_text_primary mb-1'>
					{label}
				</label>
			)}
			{InputComponent}
		</div>
	);
};

export default CustomInput;
