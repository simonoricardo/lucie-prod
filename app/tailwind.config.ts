import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			display: ['Carattere', 'serif'],
			sans: ['Lato', 'sans-serif'],
			serif: ['Kalam', 'serif']
		},
		extend: {
			spacing: {
				128: '32rem',
				160: '40rem'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config
