import { FC, useState } from 'react';
import CustomButton from '@/components/ui/custom/CustomButton';
import { CustomInputBox } from '@/components/ui/custom/CustomInputBox';
import { linkValidator } from '@/validators/linkValidator';
import { CgSearch } from 'react-icons/cg';
import { useFetchSharedIdea } from '@/hooks/content/useFetchSharedIdea';
import Card from '@/components/ui/Card';

interface SharedProps {}

const Shared: FC<SharedProps> = ({}) => {
	const [inputValue, setInputValue] = useState('');
	const [validationResult, setValidationResult] = useState<{
		username: string | null;
		hash: string;
	} | null>(null);
	const [validationError, setValidationError] = useState<any>(null);
	const hash = validationResult?.hash || null;
	const { data, isLoading, isError } = useFetchSharedIdea(hash);


	const handleChange = (link: string) => {
		setInputValue(link); 
		
	};

	const handleSearch = () => {
		const result = linkValidator.safeParse(inputValue);
		if (result.success) {
			const { username, hash } = result.data;
			if (username === 'shared') {
				// setInputValue(hash);
				setValidationResult({ username: null, hash: hash });

			} else {
				// setInputValue(`/${username}/${hash}`);
				setValidationResult({ username, hash });
			}
		} else {
			const errorMessages = result.error.issues
				.map((issue) => issue.message)
				.join(', ');
			setValidationError(errorMessages);
			
		}
	};

	return (
		<>
			<div className='flex items-center justify-center w-full space-x-5'>
				<CustomInputBox
					name='search'
					isClearable
					//@ts-ignore
					value={inputValue} 
					onChangeValue={handleChange} 
					error={validationError} 
					placeholder='Add your link'
					className='lg:max-w-[40%] max-w-fit'
				/>
				<CustomButton
					size='custom'
					variant='primary'
					classname='flex items-center justify-center gap-x-3'
					type='button'
					onClick={handleSearch} 
				>
					<CgSearch size={20} />
					<p>Search</p>
				</CustomButton>
			</div>

			<div className='bg-app_bg_secondary min-h-[600px] rounded-xl p-10'>
				{isLoading && <p>Loading...</p>}
				{!isLoading && !data && <p>No Content Found </p>}
				{data && (
					<Card
						contentId={data._id}
						link={data.link}
						title={data.title}
						type={data.type}
						authorId={data.authorId}
						tags={data.tags}
					/>
				)}
			</div>
		</>
	);
};

export default Shared;

// http://localhost:5173/dashboard/shared/$2b$10$3hI5p4JtV6F8DIsLsgaSkeV1bI2QtE82txbo3_zb1gUKOj0OhusYy
