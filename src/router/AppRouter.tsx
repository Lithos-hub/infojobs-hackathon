import { Home, Offers } from '@/features';
import { useAppDispatch } from '@/hooks';
import { MainLayout } from '@/layouts/MainLayout';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { toggleMode } from '@/utils';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router';

const AppRouter = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem('theme') === 'dark') {
			toggleMode('dark');
			dispatch(toggleDarkMode('dark'));
		} else {
			toggleMode('light');
			dispatch(toggleDarkMode('light'));
		}
	}, []);

	return (
		<MainLayout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Offers' element={<Offers />} />
			</Routes>
		</MainLayout>
	);
};

export default AppRouter;
