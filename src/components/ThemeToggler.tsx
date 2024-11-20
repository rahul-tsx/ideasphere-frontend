import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Theme, useTheme } from '@/providers/ThemeProvider';

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
			localStorage.setItem('theme', 'light');
		} else if (theme === 'light') {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
		}
	};
	React.useEffect(() => {
		const userTheme = localStorage.getItem('theme');

		setTheme((userTheme as Theme) || 'dark');
	}, []);
	return (
		<button
			onClick={toggleTheme}
			className='ring-2 ring-yellow-300 p-3 rounded-full'>
			<SunIcon
				className={`h-[1.2rem] w-[1.2rem] rotate-0  transition-all dark:-rotate-90 ${
					theme === 'dark' ? 'scale-0 hidden' : 'scale-100'
				}`}
			/>
			<MoonIcon
				className={` h-[1.2rem] w-[1.2rem] rotate-90  transition-all dark:rotate-0  ${
					theme === 'dark' ? 'scale-100 ' : 'scale-0 hidden'
				}`}
			/>
			<span className='sr-only'>Toggle theme</span>
		</button>
	);
}
