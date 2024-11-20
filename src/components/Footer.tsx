// components/Footer.tsx

import React from 'react';


const Footer: React.FC = () => {
	return (
		
		<footer className='py-6 bg-app_bg_secondary dark:bg-app_bg_dark text-center'>
		
			<p className='text-app_text_muted'>
				&copy; 2024 IdeaSphere. All rights reserved.
			</p>
			<p className='text-app_text_muted_inverse'>Made by Rahul Nair</p>
		</footer>
	);
};

export default Footer;
