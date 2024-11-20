import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import CustomInput from './ui/CustomInput';
import { useSignup } from '@/hooks/useSignup';

interface SignupFormProps {}

const emailSchema = z
	.string({
		required_error: 'Email is required',
	})
	.email('Please provide a valid email')
	.trim();

const getformSchema = () =>
	z
		.object({
			username: z
				.string({
					required_error: 'username is required',
				})
				.min(3, 'Username should be atleast 3 charcters long')
				.max(10, 'username should be maximum 10 characters long')
				.regex(
					/^[a-zA-Z0-9*@#_-]+$/,
					'Username Should only contain a-z / A-Z / 0-9 / * / @ / # / _ / - '
				)
				.trim(),
			email: emailSchema,

			password: z
				.string({
					required_error: 'Password is required',
				})
				.min(8, 'Password must be at least 8 characters long')
				.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
				.regex(/[0-9]/, 'Password must contain at least one digit')
				.regex(/[\W_]/, 'Password must contain at least one special character'),
			confirmPassword: z.string({
				required_error: 'Confirm Password is required',
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword'],
		});
type FormSchema = z.infer<ReturnType<typeof getformSchema>>;

const SignupForm: FC<SignupFormProps> = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormSchema>({ resolver: zodResolver(getformSchema()) });
	const { mutate: signup, isPending } = useSignup();

	// Form submission handler
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log(data);
		signup(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-10 w-full'>
			<div className='grid grid-cols-2 gap-10'>
				<Controller
					name='username'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Username'
							className=''
							error={errors.username}
							name='name'
							type={'text'}
							placeholder={'John Doe'}
						/>
					)}
				/>
				<Controller
					name='email'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Email'
							className=''
							error={errors.email}
							name='email'
							type={'email'}
							placeholder={'abc@gmail.com'}
						/>
					)}
				/>

				<Controller
					name='password'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Password'
							className=''
							error={errors.password}
							name='password'
							type='password'
						/>
					)}
				/>
				<Controller
					name='confirmPassword'
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<CustomInput
							{...field}
							label='Confirm Password'
							className=''
							error={errors.confirmPassword}
							name='cpassword'
							type='password'
						/>
					)}
				/>
			</div>

			<button
				type='submit'
				className='w-full bg-app_btn_primary_bg hover:bg-app_btn_primary_hover_bg p-2 text-app_text_primary rounded-lg transition'>
				{!isPending && `Sign Up`}
				{isPending && `Loading...`}
			</button>
		</form>
	);
};

export default SignupForm;
