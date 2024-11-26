import PasswordInput from './PasswordInput';
import RadioInput from './RadioInput';
import CheckboxInput from './CheckBoxInput';
import FileInput from './FileInput';
import { FieldError } from 'react-hook-form';
import CustomDropdown from './CustomDropdown';
import { cn } from '@/lib/utils';

interface Option {
	label: string;
	value: string;
}

interface CustomInputProps {
	label?: string;
	name: string;
	variant: 'normal' | 'hidden' | 'radio' | 'checkbox' | 'file' | 'dropdown';
	options?: Option[];
	error?: FieldError;
	onChangeValue?: () => void;
	className?: string;
	[x: string]: any;
}

const CustomInput = ({
	label,
	name,
	variant,
	options = [],
	onChangeValue,
	error,
	dropDownType = 'single',
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
		case 'dropdown':
			InputComponent = (
				<CustomDropdown
					name={name}
					onChange={onChangeValue!}
					options={options}
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
						{...rest}
						// onChange={(e) => {
						// 	rest.onChange?.(e);
						// 	if (rest.onChange) return;
						// }}
						className={cn(
							`w-full text-app_text_secondary dark:text-app_text_secondary_inverse p-2 border border-app_btn_primary_bg rounded-lg font-semibold outline-none `,
							className
						)}
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
