import { FC } from 'react';
import { Link } from 'react-router-dom';
import ModeSwitch from './ModeSwitch';
import { useAppSelector } from '@/hooks';

const Navbar: FC = () => {
	const isUsingDarkMode = useAppSelector(state => state.ui.darkMode);
	return (
		<header className='absolute top-0 left-1/2 -translate-x-1/2 w-[95vw] md:w-[75vw] z-50'>
			<nav className='py-5 w-full flex justify-between h-20'>
				<div className='flex gap-10 items-center'>
					<Link to='/'>
						<img
							src={`/img/${isUsingDarkMode ? 'gradient-logo' : 'dark-logo'}.png`}
							alt='Infojobs logo'
							width='100'
							height='auto'
							className='object-cover'
						/>
					</Link>
				</div>
				{/* <Icon name='avatar' className='h-10 w-10 hidden md:block bg-white/20 rounded-full p-2' /> */}
				<div className='flex gap-5 items-center'>
					<ModeSwitch />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
