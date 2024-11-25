import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import CustomInput from './ui/custom/CustomInput';

import CustomButton from './ui/custom/CustomButton';
import TagSelector from './TagSelector';
import { CONTENT_TYPES } from '@/assets/constants/data';
import { convertToCapitialCase } from '@/lib/utility/convertToCapitalCase';
import { useUpdateContent } from '@/hooks/content/useUpdateContent';
import { updateContentSchema } from '@/types/contentTypes';
import { ContentType } from '@/types/utilityTypes';
import { tagReturnScheme } from '@/types/tagsTypes';

interface UpdateContentFormProps {
	contentId: string;
	title: string;
	type: ContentType;
	tags?: tagReturnScheme[];
	note?: string;
}

const tagsSchema = z
	.array(
		z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
			message: 'Invalid ObjectId format for tags',
		})
	)
	.optional();
const getformSchema = () =>
	z.object({
		title: z
			.string()
			.optional()
			.refine((value) => value === undefined || value.length > 0, {
				message: 'Title cannot be empty if provided',
			})
			.transform((value) => (value ? value.trim() : undefined))
			.refine((value) => value === undefined || value.length >= 3, {
				message: 'Title should be at least 3 characters long',
			})
			.refine((value) => value === undefined || value.length <= 70, {
				message: 'Title should be maximum 70 characters long',
			}),
		type: z.enum(CONTENT_TYPES).optional(),
		tags: tagsSchema,
		note: z.string().optional(),
	});
type FormSchema = z.infer<ReturnType<typeof getformSchema>>;

const UpdateContentForm: FC<UpdateContentFormProps> = ({
	contentId,
	title,
	type,
	note,
	tags,
}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(getformSchema()),
		defaultValues: { note: note, title: title },
	});

	const { mutate: updateContent, isPending } = useUpdateContent();

	// Form submission handler
	const onSubmit: SubmitHandler<FormSchema> = (data: updateContentSchema) => {
		console.log('Formdata', data);
		updateContent({ contentData: data, contentId: contentId });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-10 w-full'>
			<div className='grid  gap-10'>
				<Controller
					name='title'
					control={control}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Title'
							value={field.value}
							className=''
							error={errors.title}
							name='title'
							placeholder={'Enter your title'}
							variant='normal'
						/>
					)}
				/>

				<Controller
					name='type'
					control={control}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Content Type'
							value={{ label: convertToCapitialCase([type]), value: type }}
							onChange={field.onChange}
							className=''
							error={errors.type}
							name='type'
							variant='dropdown'
							options={convertToCapitialCase(CONTENT_TYPES).map((option) => {
								return { label: option, value: option.toLowerCase() };
							})}
						/>
					)}
				/>
				<Controller
					name='tags'
					control={control}
					render={({ field }) => (
						<TagSelector
							label='Tags'
							value={tags || []}
							onChange={field.onChange}
						/>
					)}
				/>

				<Controller
					name='note'
					control={control}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Note'
							value={field.value}
							className=''
							error={errors.note}
							name='type'
							variant='normal'
						/>
					)}
				/>
			</div>
			<CustomButton
				type='submit'
				size='custom'
				variant='primary'
				classname='w-full p-2 font-bold text-lg transition'>
				{isPending ? 'Updating content...' : 'Update Content'}
			</CustomButton>
		</form>
	);
};

export default UpdateContentForm;
