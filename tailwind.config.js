/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	safelist: [
		{
			pattern:
				/^(bg|text|border)-(slate|gray|zinc|neutral|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-)?(100|200|300|400|500|600|700|800|900)?$/,
		},
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					1: '#167DB7',
				},
				secondary: {
					1: '#FF6340',
				},
				black: '#101010',
				state: {
					gray: '#999999',
					success: '#00A550',
					alert: '#F1C40F',
					error: '#E93E40',
				},
			},
		},
		fontFamily: {
			sfPro: ['"SF Pro"', 'sans-serif'],
			sfProItalic: ['"SF Pro Italic"', 'sans-serif'],
		},
	},
	plugins: [],
};
