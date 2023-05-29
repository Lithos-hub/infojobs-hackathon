import { FC } from 'react';
import { Link } from 'react-router-dom';
import ModeSwitch from './ModeSwitch';
import { useAppSelector } from '@/hooks';
import Icon from './Icon';

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
				<div className='flex gap-5'>
					<div className='flex gap-5 items-center'>
						<ModeSwitch />
					</div>
					<a
						href='https://github.com/Lithos-hub'
						target='_blank'
						className='hover:scale-125 duration-200'
					>
						<Icon name='github' className='w-8 h-8 mt-1 text-black dark:text-cyan-500' />
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
