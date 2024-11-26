import { FC, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface CustomInputProps {
	name: string;
	className?: string;
	error?: string;
	onChangeValue?: (value: string) => void; // Optional, for additional features
	isClearable?: boolean; // Enables clear functionality
	isSearchable?: boolean; // Enables search functionality
}

export const CustomInputBox: FC<CustomInputProps> = ({
	name,
	className,
	error,
	onChangeValue,
	isClearable = false,
	isSearchable = false,

	...rest
}) => {
	const [value, setValue] = useState<string>('');
	const debouncedValue = useDebounce(value, 500); // Debounce with 1 second delay

	// Handles input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		if (!isSearchable && onChangeValue) {
			onChangeValue(newValue); // Directly trigger if not searchable
		}
	};

	// Clears the input field
	const handleClear = () => {
		setValue('');
		if (onChangeValue) {
			onChangeValue('');
		}
	};

	// Trigger debounced search effect
	// useEffect(() => {
	// 	if (isSearchable && onChangeValue) {
	// 		onChangeValue(debouncedValue);
	// 	}
	// }, [debouncedValue, isSearchable, onChangeValue]);

	return (
		<div className='relative w-[50%]'>
			<div className='relative  text-app_text_secondary bg-app_bg_secondary dark:text-app_text_secondary_inverse border border-app_btn_primary_bg rounded-lg font-semibold outline-none flex'>
				<input
					id={name}
					name={name}
					type='text'
					value={value}
					autoComplete='off'
					onChange={handleChange}
					{...rest}
					className={cn(
						`bg-transparent p-2 outline-none min-w-[90%]`,
						className
					)}
				/>
				{isClearable && value && (
					<button
						type='button'
						onClick={handleClear}
						className='absolute top-1/2 right-3 w-fit transform -translate-y-1/2 text-gray-500 hover:text-black'>
						<FaTimes />
					</button>
				)}
			</div>
			{error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
		</div>
	);
};
