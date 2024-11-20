// src/api/client.ts
import axios from 'axios';

const client = axios.create({
	baseURL: process.env.VITE_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default client;
