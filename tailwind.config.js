/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector'],
	theme: {
		extend: {
			colors: {
				app_bg_primary: 'var(--bg-primary)', // Light: #ffffff, Dark: #0f172a
				app_bg_secondary: 'var(--bg-secondary)', // Light: #f3f4f6, Dark: #1e293b
				app_bg_dark: 'var(--bg-dark)', // Light: #1a1a1a, Dark: #0f0f0f
				app_bg_inverse: 'var(--bg-primary-inverse)', // Light: #0f172a, Dark: #ffffff
				app_bg_secondary_inverse: 'var(--bg-secondary-inverse)', // Light: #1e293b, Dark: #f3f4f6
				app_bg_dark_inverse: 'var(--bg-dark-inverse)', // Light: #ffffff, Dark: #1a1a1a

				// Text Colors
				app_text_primary: 'var(--text-primary)', // Light: #1a1a1a, Dark: #f3f4f6
				app_text_secondary: 'var(--text-secondary)', // Light: #4b5563, Dark: #9ca3af
				app_text_muted: 'var(--text-muted)', // Light: #6b7280, Dark: #6b7280
				app_text_hover: 'var(--text-hover)', // Light: #9ca3af, Dark: #ffffff
				app_text_primary_inverse: 'var(--text-primary-inverse)', // Light: #f3f4f6, Dark: #1a1a1a
				app_text_secondary_inverse: 'var(--text-secondary-inverse)', // Light: #9ca3af, Dark: #4b5563
				app_text_muted_inverse: 'var(--text-muted-inverse)', // Light: #6b7280, Dark: #6b7280
				app_text_hover_inverse: 'var(--text-hover-inverse)', // Light: #ffffff, Dark: #9ca3af

				// Button Colors
				app_btn_primary_bg: 'var(--btn-primary-bg)', // Light: #2563eb, Dark: #2563eb
				app_btn_primary_hover_bg: 'var(--btn-primary-hover-bg)', // Light: #1d4ed8, Dark: #1d4ed8
				app_btn_secondary_bg: 'var(--btn-secondary-bg)', // Light: #ffffff, Dark: #1a1a1a
				app_btn_secondary_hover_bg: 'var(--btn-secondary-hover-bg)', // Light: #f3f4f6, Dark: #262626

				// Border Colors
				app_border_color: 'var(--border-color)', // Light: #d1d5db, Dark: #3f3f3f
				app_border_color_inverse: 'var(--border-color-inverse)', // Light: #3f3f3f, Dark: #d1d5db
				backgroundImage: {
					gradient2: 'linear-gradient(to right, #421b1b, #5e2c2c, #ffeaea)',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],

};
