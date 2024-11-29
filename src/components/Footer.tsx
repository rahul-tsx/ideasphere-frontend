// components/Footer.tsx

import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
	return (
		<footer className='py-6 bg-app_bg_secondary  bottom-0 text-center'>
			<div className='flex justify-between px-10'>
				<Link
					to={'https://x.com/rahulnair_jsx'}
					target='_blank'>
					<FaXTwitter size={25} />
				</Link>

				<p className='text-app_text_muted'>
					&copy; 2024 IdeaSphere. All rights reserved.
				</p>
				<Link
					to={'https://github.com/rahul-tsx'}
					target='_blank'>
					<FaGithub size={25} />
				</Link>
			</div>

			<p className='text-app_text_muted_inverse'>Made by Rahul Nair</p>
		</footer>
	);
};

export default Footer;
