// src/api/auth/logout.ts
import client from '../client';

export const logout = async () => {
	const response = await client.post(`${process.env.VITE_SUB_URL}/auth/logout`);
	return response.data;
};
