import { FC, useEffect, useState } from 'react';
import CustomButton from '@/components/ui/custom/CustomButton';
import { CustomInputBox } from '@/components/ui/custom/CustomInputBox';
import { linkValidator } from '@/validators/linkValidator';
import { CgCopy, CgSearch } from 'react-icons/cg';
import { useFetchSharedIdea } from '@/hooks/content/useFetchSharedIdea';
import Card from '@/components/ui/Card';
import { useFetchSharedSphere } from '@/hooks/sphere/useFetchSharedSphere';
import useStatus from '@/hooks/useStatus';
import axios from 'axios';
import { useCopySharedSphere } from '@/hooks/sphere/useCopySharedSphere';
import { useLocation } from 'react-router-dom';
import Skeleton from '@/components/ui/custom/Skeleton';
import noResult from '@/assets/images/noResult.webp';

interface SharedProps {}

const Shared: FC<SharedProps> = ({}) => {
	const [inputValue, setInputValue] = useState('');
	const [validationResult, setValidationResult] = useState<{
		username: string | null;
		hash: string;
	} | null>(null);
	const [validationError, setValidationError] = useState<any>(null);
	const location = useLocation();
	const fullUrl = window.location.href;
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

	const changeStatus = useStatus();

	const { data: idea, isLoading: isIdeaLoading } = useFetchSharedIdea(hash2);
	const {
		data: sphere,
		isLoading: isSphereLoading,
		error,
	} = useFetchSharedSphere(username, hash1);
	const { mutate: copySphere } = useCopySharedSphere();

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
	useEffect(() => {
		const pathname = location.pathname;
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length > 2) {
			handleSearch(true, fullUrl);
		}
	}, [location.pathname]);

	const handleChange = (link: string) => {
		setInputValue(link);
	};

	const handleSearch = (fromUrl: boolean, url?: string) => {
		let result;
		if (fromUrl && url) {
			result = linkValidator.safeParse(url);
		} else {
			result = linkValidator.safeParse(inputValue);
		}

		if (result.success) {
			const { username, hash } = result.data;
			if (username === 'shared') {
				setValidationResult({ username: null, hash: hash });
			} else {
				setValidationResult({ username, hash });
			}
		} else {
			const errorMessages = result.error.issues
				.map((issue) => issue.message)
				.join(', ');
			setValidationError(errorMessages);
		}
	};
	if (isIdeaLoading || isSphereLoading) {
		return (
			<div className='ideaContainers'>
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		);
	}
	let content;
	if (
		!isIdeaLoading &&
		!idea &&
		!isSphereLoading &&
		(!sphere || sphere.length === 0)
	) {
		content = (
			<div className='m-auto reg:col-span-2 2xl:col-span-3 '>
				<img
					src={noResult}
					alt='No Results Found'
					className='rounded-lg max-w-[500px] max-h-[500px]'
				/>
			</div>
		);
	}

	return (
		<>
			<div className='flex items-center justify-between w-full  '>
				<div className='flex flex-grow  space-x-5  items-center justify-center'>
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
						onClick={() => handleSearch(false)}>
						<CgSearch size={20} />
						<p>Search</p>
					</CustomButton>
				</div>

				{sphere && sphere.length > 0 && (
					<CustomButton
						size='custom'
						variant='secondary'
						classname='flex flex-shrink-0 items-center justify-center gap-x-3'
						type='button'
						onClick={() => copySphere({ username: username!, hash: hash1! })}>
						<CgCopy size={20} />
						<p>Copy Sphere</p>
					</CustomButton>
				)}
			</div>

			<div className='ideaContainers'>
				{content}
				{idea && (
					<Card
						key={idea._id}
						content={idea}
					/>
				)}

				{sphere &&
					sphere.map((idea) => (
						<Card
							key={idea._id}
							content={idea}
						/>
					))}
			</div>
		</>
	);
};

export default Shared;


