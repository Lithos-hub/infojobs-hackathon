import { useState } from 'react';
import { motion } from 'framer-motion';

import { DarkScene, LightScene } from '@/features/Home/components';

import Button from '@/components/Button';
import SearchBox from '@/components/SearchBox';

import Assistant from './components/Assistant';

import { useAppSelector } from '@/hooks';

const Home = () => {
	const [isAsking, setIsAsking] = useState(false);

	const isUsingDarkMode = useAppSelector(state => state.ui.darkMode);

	return (
		<>
			<section className='flex flex-col h-screen gap-10 justify-center items-center'>
				<h1 className='absolute w-screen top-28 left-1/2 -translate-x-1/2 text-4xl md:text-7xl font-extralight z-50 text-center text-primary-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-primary-1 dark:to-cyan-500'>
					Te conectamos con tu futuro
				</h1>
				<div className='z-50'>
					<SearchBox
						className='w-[90vw] md:w-[60vw] text-primary-1 font-bold bg-white/10 dark:text-white dark:bg-primary-1/10 backdrop-blur pr-[120px] text-justify'
						placeholder={`Describe tu perfil profesional, experiencia, formación, tipo de empleo en el que estás interesado, etc. \n\nPor ejemplo: "Busco trabajo de camarero en Madrid, cuento con 4 años de experiencia en hostelería y fui jefe de cocina durante 2 años, tengo coche propio, hablo español e inglés fluído."`}
					/>
				</div>
				{!isAsking ? (
					<footer className='absolute bottom-0 w-screen flex justify-center z-50'>
						<div className='flex gap-10 items-center p-5'>
							<p className='text-sm text-black dark:text-white'>
								¿Necesitas consejo o ayuda para buscar empleo? Pregúntale a nuestro asistente
								virtual, estará encantado de ayudarte
							</p>
							<Button onClick={() => setIsAsking(!isAsking)}>Preguntar</Button>
						</div>
					</footer>
				) : (
					<Assistant onClose={() => setIsAsking(false)} />
				)}
			</section>

			<motion.div className='fixed bottom-0 right-0 h-screen w-screen z-0'>
				{isUsingDarkMode ? <DarkScene /> : <LightScene />}
			</motion.div>
		</>
	);
};

export default Home;
