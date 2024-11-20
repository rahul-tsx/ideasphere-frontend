// src/api/auth/login.ts
import { loginSchema } from '@/types/authtypes';
import client from '../client';

export const login = async (credentials: loginSchema) => {
	const response = await client.post(
		`${process.env.VITE_SUB_URL}/auth/login`,
		credentials
	);
	return response.data;
};
