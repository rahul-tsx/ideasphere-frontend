import { FieldError } from 'react-hook-form';

interface Option {
	label: string;
	value: string;
}

interface RadioInputProps {
	name: string;
	options: Option[];
	error?: FieldError;
	className?: string;
}

const RadioInput = ({
	name,
	options,
	error,
	className = '',
	...rest
}: RadioInputProps) => {
	return (
		<div className='grid grid-cols-2 space-y-2'>
			{options.map((option) => (
				<label
					key={option.value}
					className='flex items-center space-x-2'>
					<input
						type='radio'
						id={`${name}-${option.value}`}
						name={name}
						value={option.value}
						className={`form-radio ${className}`}
						{...rest}
					/>
					<span>{option.label}</span>
				</label>
			))}
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
};

export default RadioInput;
