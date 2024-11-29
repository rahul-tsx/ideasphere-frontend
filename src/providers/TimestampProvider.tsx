import { useState, ReactNode, useCallback } from 'react';
import TimestampContext from '@/context/timeStampContext';

interface TimestampProviderProps {
	children: ReactNode;
}

const TimestampProvider = ({ children }: TimestampProviderProps) => {
	const [timestamp, setTimestamp] = useState<number>(Date.now());

	const updateTimestamp = useCallback((newTimestamp: number) => {
		setTimestamp(newTimestamp);
	}, []);

	return (
		<TimestampContext.Provider
			value={{ timestamp, setTimestamp: updateTimestamp }}>
			{children}
		</TimestampContext.Provider>
	);
};

export default TimestampProvider;
