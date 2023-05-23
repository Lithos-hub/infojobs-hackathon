import { FC } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleDarkMode } from '@/store/slices/uiSlice';
import { toggleMode } from '@/utils';

const ModeSwitch: FC = () => {
	const isUsingDarkMode = useAppSelector(state => state.ui.darkMode);
	const dispatch = useAppDispatch();

	const onToggleMode = () => {
		if (isUsingDarkMode) {
			toggleMode('light');
			dispatch(toggleDarkMode('light'));
		} else {
			toggleMode('dark');
			dispatch(toggleDarkMode('dark'));
		}
	};

	return (
		<>
			<div
				className='flex rounded-full bg-secondary-2 gap-5 bg-primary-1/80 dark:bg-primary-1/20 justify-between cursor-pointer w-[70px] h-full z-0'
				onClick={() => onToggleMode()}
			>
				<div className='relative h-auto w-full'>
					{!isUsingDarkMode ? (
						<motion.div
							initial={{
								left: '-50px',
							}}
							animate={{
								left: '20px',
							}}
							transition={{
								duration: 0.5,
							}}
							className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2.5 bg-white rounded-full'
						>
							<img src='/img/sun.png' className='h-[35px] shadow rounded-full' />
						</motion.div>
					) : (
						<motion.div
							initial={{
								opacity: 0,
								left: '0px',
							}}
							animate={{
								opacity: 1,
								left: '50px',
							}}
							transition={{
								duration: 0.5,
							}}
							className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[35px] flex gap-2.5 bg-white rounded-full'
						>
							<img src='/img/moon.png' className='min-w-[35px] h-50  shadow rounded-full' />
						</motion.div>
					)}
				</div>
			</div>
		</>
	);
};

export default ModeSwitch;
