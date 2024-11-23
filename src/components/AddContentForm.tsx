import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import CustomInput from './ui/custom/CustomInput';
import { useSignup } from '@/hooks/auth/useSignup';
import CustomButton from './ui/custom/CustomButton';
import TagSelector from './TagSelector';

interface AddContentFormProps {}

const emailSchema = z
	.string({
		required_error: 'Email is required',
	})
	.email('Please provide a valid email')
	.trim();
const tagsSchema = z.array(
	z
		.string()
		.optional()
		.refine((value) => !value || /^[0-9a-fA-F]{24}$/.test(value), {
			message: 'Invalid ObjectId format for tags',
		})
);
const getformSchema = () =>
	z.object({
		title: z
			.string({
				required_error: 'title is required',
			})
			.min(3, 'Title should be atleast 3 characters long')
			.max(70, 'Title should be maximum 70 characters long')
			.trim(),
		link: z
			.string({ required_error: 'link is required' })
			.url({ message: 'invalid url' }),
		type: z.enum([
			'document',
			'tweet',
			'youtube',
			'article',
			'blog',
			'podcasts',
		]),
		tags: tagsSchema,
		note: z.string().optional(),
	});
type FormSchema = z.infer<ReturnType<typeof getformSchema>>;

const AddContentForm: FC<AddContentFormProps> = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormSchema>({ resolver: zodResolver(getformSchema()) });
	// const { mutate: signup, isPending } = useSignup();

	// Form submission handler
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-10 w-full'>
			<div className='grid  gap-10'>
				<Controller
					name='title'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Title'
							value={undefined}
							className=''
							error={errors.title}
							name='title'
							placeholder={'Enter your title'}
							variant='normal'
						/>
					)}
				/>
				<Controller
					name='link'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='link'
							value={undefined}
							className=''
							error={errors.link}
							name='link'
							placeholder={'Enter your Content Link'}
							variant='normal'
						/>
					)}
				/>

				<Controller
					name='type'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Content Type'
							value={undefined}
							className=''
							error={errors.type}
							name='type'
							variant='dropdown'
							options={[
								'document',
								'tweet',
								'youtube',
								'article',
								'blog',
								'podcasts',
							].map((option) => {
								return { label: option.toUpperCase(), value: option };
							})}
						/>
					)}
				/>
				<TagSelector label={'Tags'} />

				<Controller
					name='note'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Note'
							value={undefined}
							className=''
							error={errors.note}
							name='type'
							variant='normal'
						/>
					)}
				/>
				{/* <Controller
					name='tags'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Tags'
							value={undefined}
							className=''
							error={errors.tags}
							name='tags'
							variant='normal'
						/>
					)}
				/> */}
			</div>
			<CustomButton
				type='submit'
				size='custom'
				variant='primary'
				classname='w-full p-2 font-bold text-lg transition'>
				{/* {isPending ? 'Loading...' : 'Sign Up'} */}
				Add Content
			</CustomButton>
		</form>
	);
};

export default AddContentForm;
