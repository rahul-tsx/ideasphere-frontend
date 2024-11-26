import { FC, useEffect, useState } from 'react';
import CustomButton from '@/components/ui/custom/CustomButton';
import { CustomInputBox } from '@/components/ui/custom/CustomInputBox';
import { linkValidator } from '@/validators/linkValidator';
import { CgSearch } from 'react-icons/cg';
import { useFetchSharedIdea } from '@/hooks/content/useFetchSharedIdea';
import Card from '@/components/ui/Card';
import { useFetchSharedSphere } from '@/hooks/sphere/useFetchSharedSphere';
import useStatus from '@/hooks/useStatus';
import axios from 'axios';

interface SharedProps {}

const Shared: FC<SharedProps> = ({}) => {
	const [inputValue, setInputValue] = useState('');
	const [validationResult, setValidationResult] = useState<{
		username: string | null;
		hash: string;
	} | null>(null);
	const [validationError, setValidationError] = useState<any>(null);
	let username = null;
	let hash1 = null;
	let hash2 = null;
	if (validationResult && validationResult.username && validationResult.hash) {
		username = validationResult.username;
		hash1 = validationResult.hash;
	} else if (
		validationResult &&
		validationResult.hash &&
		!validationResult.username
	) {
		hash2 = validationResult.hash;
	}
	// const hash = validationResult?.username ? validationResult?.hash : null;
	const changeStatus = useStatus();

	const { data: idea, isLoading: isIdeaLoading } = useFetchSharedIdea(hash2);
	const {
		data: sphere,
		isLoading: isSphereLoading,
		error,
	} = useFetchSharedSphere(username, hash1);
	
	useEffect(() => {
		if (error) {
			if (axios.isAxiosError(error) && error.response) {
				const errorMessage = error.response.data.message || 'Idea not Deleted';
				changeStatus(errorMessage, 'error');
			} else {
				changeStatus('An unexpected error occurred:', 'error');
			}
		}
	}, [error]);
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
					onClick={handleSearch}>
					<CgSearch size={20} />
					<p>Search</p>
				</CustomButton>
			</div>

			<div className='ideaContainers'>
				{isIdeaLoading && <p>Loading...</p>}

				{!isIdeaLoading &&
					!idea &&
					!isSphereLoading &&
					(!sphere || sphere.length === 0) && <p>No Content Found </p>}
				{idea && (
					<Card
						contentId={idea._id}
						link={idea.link}
						title={idea.title}
						type={idea.type}
						authorId={idea.authorId}
						tags={idea.tags}
					/>
				)}
				{isSphereLoading && <p>Loading...</p>}

				{sphere &&
					sphere.map((idea) => (
						<Card
							contentId={idea._id}
							link={idea.link}
							title={idea.title}
							type={idea.type}
							authorId={idea.authorId}
							tags={idea.tags}
						/>
					))}
			</div>
		</>
	);
};

export default Shared;

// http://localhost:5173/dashboard/shared/$2b$10$3hI5p4JtV6F8DIsLsgaSkeV1bI2QtE82txbo3_zb1gUKOj0OhusYy
