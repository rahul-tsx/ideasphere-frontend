import { FieldError } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

interface Option {
	label: string;
	value: string;
}

interface DropdownProps {
	name: string;
	options: Option[];
	error?: FieldError;
	className?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	value?: Option;
}

export const dropdownStyles: StylesConfig<Option> = {
	control: (styles) => ({
		...styles,
		backgroundColor: 'white', // bg-white
		border: '1px solid var(--btn-primary-bg)', // border border-app_bg_primary
		':hover': {
			border: '1px solid var(--btn-primary-bg)', // hover:bg-app_bg_primary
		},
		boxShadow: 'none',
		outline: 'none', // outline-none
		appearance: 'none',
		':focus': {
			appearance: 'none',
			outline: 'none', // focus:outline-none
			boxShadow: '1px solid var(--btn-primary-bg)',
		},
	}),
	option: (styles, { isDisabled, isFocused, isSelected }) => {
		return {
			...styles,

			backgroundColor: isDisabled
				? undefined
				: isSelected
				? 'beige'
				: isFocused
				? 'var(--btn-primary-bg)'
				: undefined,
			color: isDisabled ? '#ccc' : isSelected ? 'black' : 'black',
			cursor: isDisabled ? 'not-allowed' : 'default',

			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled
					? isSelected
						? 'var(--btn-secondary-bg)'
						: 'white'
					: undefined,
			},
		};
	},
	input: (styles) => ({ ...styles }),
	placeholder: (styles) => ({ ...styles }),
	// singleValue: (styles, { data }) => ({ ...styles }),
};

const CustomDropdown = ({
	name,
	options,
	error,
	className = '',

	placeholder = 'Select an option',
	onChange,
	value,
	...rest
}: DropdownProps) => {
	const handleChange = (newValue: any) => {
		// const tagsValue = newValue.map((tag: TagOption) => tag.value);
		// console.log('newValeu content', newValue);
		onChange(newValue.value);
	};
	return (
		<div className='space-y-2'>
			<div className='relative '>
				{/* <span className='absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-4 h-4'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</span> */}
				<Select
					className='basic-single'
					classNamePrefix='select'
					defaultValue={value}
					isClearable={true}
					onChange={handleChange}
					isSearchable={true}
					styles={dropdownStyles}
					name={name}
					options={options}
					{...rest}
				/>
			</div>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
};

export default CustomDropdown;
