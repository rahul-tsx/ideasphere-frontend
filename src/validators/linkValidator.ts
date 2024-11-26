import { getHostname } from '@/lib/utility/getHostname';
import { z } from 'zod';


export const linkValidator = z.string().transform((input) => {
  try {
  
    const url = new URL(input);
    const hostname = getHostname(); 
    const port = process.env.VITE_FRONTEND_PORT; 
    const pathname = '/dashboard/shared';


    const isCorrectHostname = url.hostname === hostname;
    const isCorrectPort = port ? url.port === port : true; 
    const isCorrectPathname = url.pathname.startsWith(pathname); 


    const pathParts = url.pathname.split('/').filter(Boolean); 

   
    const [username, hash] = pathParts.slice(-2); 

    const isValidUsername = username
      ? /^[a-zA-Z0-9*@#_-]+$/.test(username)
      : true;

    const isValidHash = hash && /^[A-Za-z0-9-$_]{60}$/.test(hash);

   
    if (
      isCorrectHostname &&
      isCorrectPort &&
      isCorrectPathname &&
      isValidHash &&
      isValidUsername 
    ) {
     
      return { username, hash };
    } else {
  
      return null;
    }
  } catch (error) {

    return null;
  }
}).refine((result) => result !== null, {
  message: 'Invalid Link', 
});

