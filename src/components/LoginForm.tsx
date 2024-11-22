import { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import CustomInput from './ui/custom/CustomInput';
import { useLogin } from '@/hooks/auth/useLogin';
import CustomButton from './ui/custom/CustomButton';

interface LoginFormProps {}

const emailSchema = z
	.string({
		required_error: 'Email is required',
	})
	.email('Please provide a valid email')
	.trim();

const getformSchema = () =>
	z.object({
		email: emailSchema,
		password: z.string({
			required_error: 'Password is required',
		}),
	});

type FormSchema = z.infer<ReturnType<typeof getformSchema>>;

const LoginForm: FC<LoginFormProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { mutate: login, isPending } = useLogin();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormSchema>({ resolver: zodResolver(getformSchema()) });

	// Form submission handler
	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log(data);
		login(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-10 w-full'>
			<Controller
				name='email'
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<CustomInput
						{...field}
						label='Email'
						value={undefined}
						className=''
						error={errors.email}
						name='email'
						placeholder={'abc@gmail.com'}
						variant='normal'
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
						value={undefined}
						className=''
						error={errors.password}
						name='password'
						variant='hidden'
						placeholder={'enter your password...'}
					/>
				)}
			/>
			<CustomButton
				type='submit'
				size='custom'
				variant='primary'
				classname='w-full p-2 font-bold text-lg transition'>
				{isPending ? 'Logging in' : 'Login'}
			</CustomButton>
		
		</form>
	);
};

export default LoginForm;
