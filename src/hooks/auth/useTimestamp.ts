import { useContext } from 'react';
import TimestampContext from '@/context/timeStampContext';

const useTimestamp = () => {
    const context = useContext(TimestampContext);
    if (!context) {
        throw new Error('useTimestamp must be used within a TimestampProvider');
    }
    return context;
};

export default useTimestamp;
