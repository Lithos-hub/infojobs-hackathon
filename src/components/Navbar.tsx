import { FC } from 'react';
import { Link } from 'react-router-dom';
import ModeSwitch from './ModeSwitch';
import { useAppSelector } from '@/hooks';

const Navbar: FC = () => {
	const isUsingDarkMode = useAppSelector(state => state.ui.darkMode);
	return (
		<header className='absolute top-0 w-full z-50'>
			<nav className='p-5 w-full flex justify-between h-20'>
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
					<Link to='/generator'>
						<span className='hidden md:block text-sm text-primary-1'>Generador de tests</span>
					</Link>
					<Link to='/evaluator'>
						<span className='hidden md:block text-sm text-primary-1'>Evaluador de tests</span>
					</Link>
				</div>
				{/* <Icon name='avatar' className='h-10 w-10 hidden md:block bg-white/20 rounded-full p-2' /> */}
				<div className='flex gap-5 items-center'>
					<ModeSwitch />
					<button className=''>
						<img
							src='https://this-person-does-not-exist.com/img/avatar-gen1d37c9179ddc29666c8aaae996d3f6cb.jpg'
							className='w-11 h-full object-cover rounded-full hidden md:block border-2 border-primary-1/50'
						/>
					</button>
					<div
						id='hamburguer-menu'
						className='h-[25px] w-[25px] flex flex-col gap-2 md:hidden cursor-pointer'
					>
						<div className='bg-white w-full h-[1px]'></div>
						<div className='bg-white w-full h-[1px]'></div>
						<div className='bg-white w-full h-[1px]'></div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
