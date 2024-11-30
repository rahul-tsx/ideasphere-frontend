// src/api/auth/login.ts
import { loginSchema } from '@/types/authtypes';
import client from '../client';

export const login = async (credentials: loginSchema) => {
	try {
		const response = await client.post(
			`${process.env.VITE_SUB_URL}/auth/login`,
			credentials
		);

		return response.data;
	} catch (error) {
		console.error('login.ts', error);
	}
};
