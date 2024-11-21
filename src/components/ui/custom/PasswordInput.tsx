import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface PasswordInputProps {
	name: string;
	error?: FieldError;
	placeholder?: string;
	className?: string;
}

const PasswordInput = ({
	name,
	error,
	placeholder,
	className = '',
	...rest
}: PasswordInputProps) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	return (
		<>
			{' '}
			<div className='flex items-center justify-between font-semibold text-app_text_secondary dark:text-app_text_secondary_inverse bg-white w-full p-2 border border-app_btn_primary_bg  rounded-lg ${className}'>
				<input
					id={name}
					name={name}
					type={isPasswordVisible ? 'text' : 'password'}
					placeholder={placeholder}
					className={`outline-none`}
					{...rest}
				/>
				<div
					className=' cursor-pointer text-black'
					onClick={() => setPasswordVisible(!isPasswordVisible)}>
					{isPasswordVisible ? (
						<AiOutlineEyeInvisible size={20} />
					) : (
						<AiOutlineEye size={20} />
					)}
				</div>
			</div>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</>
	);
};

export default PasswordInput;
