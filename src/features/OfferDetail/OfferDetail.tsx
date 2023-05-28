import { useState } from 'react';
import { useParams } from 'react-router';

import { getOffer, useChatGPT } from '@/services/apis';
import { OfferDetail } from '@/models';
import { useEffectAsync } from '@chengsokdara/react-hooks-async';
import { Button, Icon, Loader, Overlay } from '@/components';

import { SkillsTest } from './components';

const OfferDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const [offer, setOffer] = useState<OfferDetail | null>(null);
	const [loadingOffer, setLoadingOffer] = useState<boolean>(true);
	const [loadingTest, setLoadingTest] = useState<boolean>(false);
	const [isShowingTest, setIsShowingTest] = useState<boolean>(false);
	const [questionsList, setQuestionsList] = useState<string[]>([]);

	const onToggleTest = () => setIsShowingTest(prev => !prev);

	const onLoadQuestions = async () => {
		if (!offer) return;

		setLoadingTest(true);

		const offerDescriptionAndRequirements = `
			Descripción de la oferta: ${offer.description}
			Conocimientos necesarios: ${offer.skillsList.map(skill => skill).join(', ')}
		`;

		try {
			const res = await useChatGPT({
				type: 'generator-assistant',
				message: offerDescriptionAndRequirements,
			});
			if (res) {
				const resToArrayOfOptions = res.split('*').filter(Boolean);
				setQuestionsList(resToArrayOfOptions);
				setIsShowingTest(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingTest(false);
		}
	};

	useEffectAsync(async () => {
		setLoadingOffer(true);
		try {
			const res = await getOffer(id as string);
			if (res) setOffer(res.data);
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => setLoadingOffer(false), 250);
		}
	}, [id]);

	return loadingOffer || loadingTest ? (
		<>
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center'>
				<Loader loaderType='horizontal' messages={[]} />
				{loadingTest && (
					<h2 className='text-primary-1'>Estamos generando el test. Tardará unos instantes.</h2>
				)}
			</div>
		</>
	) : offer ? (
		<section className='py-[10vh]'>
			<Button onClick={() => window.history.back()} className='cursor-pointer flex items-center'>
				Regresar
			</Button>
			<article className='p-5 shadow-xl shadow-black/20 dark:bg-slate-900 rounded-[30px] mt-5 border dark:border-primary-1 relative flex flex-col gap-5'>
				<h1 className='text-center text-2xl md:text-left md:text-4xl text-black dark:text-primary-1 font-bold'>
					{offer.title}
				</h1>
				<div className='flex flex-col md:flex-row gap-10 justify-between items-center'>
					<div className='flex flex-col gap-3 items-center md:items-start'>
						<a
							href={offer.profile.url}
							target='_blank'
							rel='noreferrer'
							className='md:min-w-[230px] h-auto'
						>
							<img
								src={offer.profile.logoUrl}
								alt={offer.profile.name}
								className='border rounded-xl object-cover hover:scale-105 w-[150px] md:max-w-[250px] duration-200 shadow-2xl hover:shadow-xl hover:opacity-75'
							/>
						</a>
						<p className='text-base dark:text-white'>{offer.profile.name}</p>
					</div>
					<div className='flex flex-col items-center md:items-end text-right gap-5'>
						<h3 className='text-right text-3xl dark:text-cyan-500'>
							<strong className='text-slate-900 dark:text-white'>{offer.applications}</strong>{' '}
							inscritos a esta oferta
						</h3>
						<div className='flex text-slate-900 dark:text-cyan-500 justify-end'>
							<Icon name='location' className='h-10 w-10' />
							<h3 className='text-2xl'>
								{offer.province.value} ({offer.city})
							</h3>
						</div>
						<h3 className='flex justify-end text-slate-900 dark:text-cyan-500'>
							<Icon name='currency' className='h-14 w-14' />
							<strong
								className={`${
									offer.salaryDescription.includes('no disponible')
										? 'text-red-500'
										: 'text-slate-900 dark:text-white'
								} text-3xl`}
							>
								{offer.salaryDescription}
							</strong>
						</h3>
						<Button>Aplicar a la oferta</Button>
					</div>
				</div>
				<h3 className='text-2xl text-slate-900 dark:text-cyan-500 mt-5 font-bold'>
					Test de aptitudes
				</h3>
				<hr className='border-slate-900 dark:border-cyan-500 py-2' />
				<div className='flex flex-col gap-5 items-start'>
					<p>
						Pon a prueba tus conocimientos realizando un test acerca de los requisitos de esta
						oferta. La empresa podrá ver los resultados, por lo que te recomendamos que lo hagas con
						calma y sin ayuda externa. ¡Mucha suerte!
					</p>
					<Button variant='primary' onClick={onLoadQuestions}>
						Realizar test
					</Button>
				</div>
				{isShowingTest && (
					<>
						<Overlay onClose={onToggleTest} />
						<SkillsTest questionsList={questionsList} onClose={onToggleTest} />
					</>
				)}

				<h3 className='text-2xl text-slate-900 dark:text-cyan-500 mt-5 font-bold'>Requisitos</h3>
				<hr className='border-slate-900 dark:border-cyan-500 py-2' />
				<div className='flex flex-col gap-3 mb-10 dark:text-white'>
					<strong className='dark:text-white'>Estudios mínimos</strong>
					<span className='dark:text-primary-1'>{offer.studiesMin.value}</span>

					<strong className='dark:text-white'>Experiencia mínima</strong>
					<p className='dark:text-primary-1'>{offer.experienceMin.value}</p>

					<strong className='dark:text-white'>Conocimientos necesarios</strong>
					<div className='flex flex-wrap gap-2'>
						{offer.skillsList.map(({ skill }) => (
							<span
								key={skill}
								className='border border-primary-1 text-black dark:text-cyan-500 rounded-full p-2 px-10 shadow-xl'
							>
								{skill}
							</span>
						))}
					</div>
				</div>

				<h3 className='text-2xl text-slate-900 dark:text-cyan-500 font-bold'>Descripción</h3>
				<hr className='border-slate-900 dark:border-cyan-500 py-2' />
				{/* Separate the paragraphs of the string */}
				{offer.description.split('\n').map((paragraph, index) => (
					<p key={index} className='py-1 text-black dark:text-white'>
						{paragraph}
					</p>
				))}

				<h3 className='text-2xl text-slate-900 dark:text-cyan-500 mt-5 font-bold'>
					Información adicional
				</h3>
				<hr className='border-slate-900 dark:border-cyan-500 py-2' />
				<div className='flex flex-col gap-3 mb-10 dark:text-white'>
					<strong>Tipo de industria de la oferta</strong>
					<p>{offer.profile.typeIndustry.value}</p>
					<strong>Categoría</strong>
					<p>
						{offer.category.value} - {offer.subcategory.value}
					</p>
					<strong>Nivel</strong>
					<p>{offer.jobLevel.value}</p>
				</div>
			</article>
		</section>
	) : !offer && !loadingOffer ? (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<p>No se ha encontrado la oferta</p>
		</div>
	) : null;
};

export default OfferDetailsPage;
