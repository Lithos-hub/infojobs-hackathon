export const toggleMode = (mode: 'dark' | 'light') => {
	const root = document.documentElement;
	if (mode === 'dark') {
		localStorage.setItem('theme', 'dark');
		root.classList.add('dark');
	} else {
		localStorage.setItem('theme', 'light');
		root.classList.remove('dark');
	}
};
