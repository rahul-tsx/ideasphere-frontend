/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector'],
	theme: {
    	extend: {
    		colors: {
    			app_bg_primary: 'var(--bg-primary)',
    			app_bg_secondary: 'var(--bg-secondary)',
    			app_bg_dark: 'var(--bg-dark)',
    			app_bg_inverse: 'var(--bg-primary-inverse)',
    			app_bg_secondary_inverse: 'var(--bg-secondary-inverse)',
    			app_bg_dark_inverse: 'var(--bg-dark-inverse)',
    			app_text_primary: 'var(--text-primary)',
    			app_text_secondary: 'var(--text-secondary)',
    			app_text_muted: 'var(--text-muted)',
    			app_text_hover: 'var(--text-hover)',
    			app_text_primary_inverse: 'var(--text-primary-inverse)',
    			app_text_secondary_inverse: 'var(--text-secondary-inverse)',
    			app_text_muted_inverse: 'var(--text-muted-inverse)',
    			app_text_hover_inverse: 'var(--text-hover-inverse)',
    			app_btn_primary_bg: 'var(--btn-primary-bg)',
    			app_btn_primary_hover_bg: 'var(--btn-primary-hover-bg)',
    			app_btn_secondary_bg: 'var(--btn-secondary-bg)',
    			app_btn_secondary_hover_bg: 'var(--btn-secondary-hover-bg)',
    			app_border_color: 'var(--border-color)',
    			app_border_color_inverse: 'var(--border-color-inverse)',
    			app_card_primary_bg: 'var(--card-bg)',
    			app_card_primaryshadow: 'var(--card-shadow)',
    			app_card_primaryborder: 'var(--card-border)',
    			backgroundImage: {
    				gradient2: 'linear-gradient(to right, #421b1b, #5e2c2c, #ffeaea)'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		
    	}
    },
	plugins: [require('tailwindcss-animate')],
};
