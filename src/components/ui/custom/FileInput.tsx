import { FieldError } from 'react-hook-form';

interface FileInputProps {
	name: string;
	error?: FieldError;
	className?: string;
}

const FileInput = ({
	name,
	error,
	className = '',
	...rest
}: FileInputProps) => {
	return (
		<div className='flex flex-col items-center space-y-2'>
			<input
				id={name}
				name={name}
				type='file'
				className='hidden'
				{...rest}
			/>
			<label
				htmlFor={name}
				className={`px-4 py-2 bg-app_btn_primary_bg rounded-lg text-white cursor-pointer hover:bg-app_btn_primary_hover_bg ${className}`}>
				Upload File
			</label>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
};

export default FileInput;
