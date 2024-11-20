// src/api/auth/signup.ts
import { signupSchema } from '@/types/authtypes';
import client from '../client';

export const signup = async (userData: signupSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/auth/signup`,
		userData
	);
	return response.data;
};
