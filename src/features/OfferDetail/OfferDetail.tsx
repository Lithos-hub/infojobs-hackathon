import { useState } from 'react';
import { useParams } from 'react-router';

import { getOffer } from '@/services/apis';
import { OfferDetail } from '@/models';
import { useEffectAsync } from '@chengsokdara/react-hooks-async';
import { Icon } from '@/components';

const OfferDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const [offer, setOffer] = useState<OfferDetail | null>(null);

	useEffectAsync(async () => {
		try {
			const res = await getOffer(id as string);
			if (res) setOffer(res.data);
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	return offer ? (
		<section className='py-[10vh] max-w-[75vw] mx-auto'>
			<article className='p-5 shadow-xl shadow-black/20 dark:bg-slate-900'>
				<div className='flex justify-between w-full'>
					<img
						src={offer.profile.logoUrl}
						alt={offer.profile.name}
						className='w-auto h-[230px] rounded-xl object-cover'
					/>
					<div className='flex flex-col gap-5'>
						<h1 className='text-5xl text-black dark:text-primary-1 font-bold'>{offer.title}</h1>
						<h2 className='text-2xl text-right dark:text-white'>{offer.profile.name}</h2>
						<div className='flex text-secondary-1 dark:text-cyan-500 justify-end'>
							<Icon name='location' className='h-10 w-10' />
							<h3 className='text-2xl'>{offer.province.value}</h3>
						</div>
						<h4 className='text-right text-3xl dark:text-cyan-500'>
							<strong className='text-secondary-1 dark:text-white'>{offer.applications}</strong>{' '}
							inscritos a esta oferta
						</h4>
					</div>
				</div>

				<h3 className='text-2xl text-secondary-1 dark:text-cyan-500 mt-5 font-bold'>Requisitos</h3>
				<hr className='border-secondary-1 dark:border-cyan-500 py-2' />
				<div className='flex flex-col gap-3 mb-10 dark:text-white'>
					<strong className='dark:text-secondary-1'>Estudios mínimos</strong>
					<p>{offer.studiesMin.value}</p>

					<strong className='dark:text-secondary-1'>Experiencia mínima</strong>
					<p>{offer.experienceMin.value}</p>

					<strong className='dark:text-secondary-1'>Conocimientos necesarios</strong>
					<div className='flex flex-wrap gap-2'>
						{offer.skillsList.map(({ skill }) => (
							<span
								key={skill}
								className=' dark:bg-primary-1 py-1 bg-primary-1 rounded-full text-white px-10 shadow-xl'
							>
								{skill}
							</span>
						))}
					</div>
				</div>

				<h3 className='text-2xl text-secondary-1 dark:text-cyan-500 font-bold'>Descripción</h3>
				<hr className='border-secondary-1 dark:border-cyan-500 py-2' />
				{/* Separate the paragraphs of the string */}
				{offer.description.split('\n').map((paragraph, index) => (
					<p key={index} className='py-1 text-black dark:text-white'>
						{paragraph}
					</p>
				))}

				<h3 className='text-2xl text-secondary-1 dark:text-cyan-500 mt-5 font-bold'>
					Información adicional
				</h3>
				<hr className='border-secondary-1 dark:border-cyan-500 py-2' />
				<div className='flex flex-col gap-3 mb-10 dark:text-white'>
					<strong>Tipo de industria de la oferta</strong>
					<p>{offer.profile.typeIndustry.value}</p>
					<strong>Categoría</strong>
					<p>
						{offer.category.value} - {offer.subcategory.value}
					</p>
					<strong>Nivel</strong>
					<p>{offer.jobLevel.value}</p>
					<strong>Salario</strong>
					<p>{offer.salaryDescription}</p>
					<strong>Beneficios sociales</strong>
				</div>
			</article>
		</section>
	) : (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<p>No se ha encontrado la oferta</p>
		</div>
	);
};

export default OfferDetailsPage;
