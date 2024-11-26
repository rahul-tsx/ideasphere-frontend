import { getHostname } from '@/lib/utility/getHostname';
import { z } from 'zod';

// Simplified Zod link validation schema
export const linkValidator = z.string().transform((input) => {
  try {
    // Try to create a URL object to validate the URL
    const url = new URL(input);
    const hostname = getHostname(); // Fetch the expected hostname
    const port = process.env.VITE_FRONTEND_PORT; // Expected port (if any)
    const pathname = '/dashboard/shared'; // Fixed pathname for validation

    // Check if the URL hostname matches the expected hostname and port (optional)
    const isCorrectHostname = url.hostname === hostname;
    const isCorrectPort = port ? url.port === port : true; // Check if port is matched, if it's present
    const isCorrectPathname = url.pathname.startsWith(pathname); // Check if pathname starts with '/dashboard/shared'

    // Extract username and hash from the pathname after '/dashboard/shared/'
    const pathParts = url.pathname.split('/').filter(Boolean); // Split the pathname and remove empty parts

    // We expect the last two parts to be username and hash (username is optional)
    const [username, hash] = pathParts.slice(-2); // Last two segments (username and hash)

    // Validate username (if it exists)
    const isValidUsername = username
      ? /^[a-zA-Z0-9*@#_-]+$/.test(username)
      : true;

    const isValidHash = hash && /^[A-Za-z0-9-$_]{60}$/.test(hash); // Hash must exist and be alphanumeric

    // All checks must pass
    if (
      isCorrectHostname &&
      isCorrectPort &&
      isCorrectPathname &&
      isValidHash &&
      isValidUsername // If username exists, it's validated; otherwise, this is true
    ) {
      // Return an object with the username and hash if valid
      return { username, hash };
    } else {
      // If any validation fails, return null or throw an error
      return null;
    }
  } catch (error) {
    // Return null if the URL constructor throws an error
    return null;
  }
}).refine((result) => result !== null, {
  message: 'Invalid Link', // Custom error message for invalid URL
});

