import { FC } from 'react';

import { Navbar } from '@/components';

export interface MainLayoutProps {
	children: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className='w-[95vw] md:w-[80vw] lg:w-[75vw] mx-auto min-h-screen relative'>
				{children}
			</main>
		</>
	);
};
