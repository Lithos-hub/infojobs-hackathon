import { Button, Icon } from '@/components';
import { Offer } from '@/models';
import { FC, useMemo } from 'react';
import CategoryChip from './CategoryChip';

const OfferCard: FC<Offer> = ({
	id,
	author,
	title,
	experienceMin,
	workDay,
	province,
	contractType,
	teleworking,
	published,
	category,
}) => {
	const publishedDate = useMemo(() => new Date(published).toLocaleDateString(), [published]);
	const simplifiedTitle = useMemo(() => {
		if (title.length > 50) {
			return `${title.slice(0, 40)}...`;
		} else {
			return title;
		}
	}, [author.name]);
	return (
		<li
			key={id}
			className='shadow-xl shadow-black/30 h-full aspect-square hover:scale-105 duration-200 cursor-pointer'
		>
			<article className=' bg-primary-1 dark:bg-slate-900 overflow-hidden w-full h-full relative'>
				<div className='absolute top-0 right-0'>
					<CategoryChip category={category.value} />
				</div>
				<div className='relative flex flex-col justify-between h-full pt-7'>
					<div className='p-5'>
						<div className='flex justify-between items-start'>
							<div className='flex flex-col gap-2'>
								<img src={author.logoUrl} className='w-20 h-20 object-cover rounded bg-white' />
							</div>
							<div className='flex flex-col gap-3 text-white text-right'>
								<small className='text-white text-xs'>Publicado el {publishedDate}</small>
								<div className='flex self-end'>
									<Icon name='location' className='h-5 w-5' />
									<small>{province.value}</small>
								</div>
							</div>
						</div>
						<div className='py-5 flex flex-col'>
							<h2 className='text-black dark:text-cyan-500 font-bold text-xs'>{author.name}</h2>
							<h3 className='text-white font-bold text-xl'>{simplifiedTitle}</h3>
						</div>
					</div>
					<div className='bg-slate-900 p-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center text-white dark:text-cyan-500 text-center'>
						<div className='flex gap-1 items-center'>
							<Icon name='contract' className='h-5 w-5' />
							<small className='text-[10px]'>{contractType.value}</small>
						</div>
						<div className='flex gap-1 items-center text-center'>
							<Icon name='remote' className='h-5 w-5' />
							<small className='text-[10px]'>{teleworking ? teleworking.value : 'N/A'}</small>
						</div>
						<div className='flex gap-1 items-center text-center'>
							<Icon name='workday' className='h-5 w-5' />
							<small className='text-[10px]'>
								{workDay ? `Jornada ${workDay.value.toLowerCase()}` : 'N/A'}
							</small>
						</div>
					</div>
				</div>
				{/* <div className='relative'>
					<h3 className='text-sm bg-white/50 backdrop-blur-lg text-black font-bold absolute top-0 left-0 w-full text-center p-5'>
						{author.name}
					</h3>
					<img src={author.logoUrl} className='w-full h-[300px] object-cover' />
					<h2 className='absolute bottom-0 bg-cyan-900/80 text-white font-bold backdrop-blur w-full p-2 text-xl'>
						{title}
					</h2>
				</div>
				<div className='flex justify-center'>
					<div className='flex gap-1 p-5 items-center'>
						<Icon name='location' className='h-6 w-6 text-primary-1' />
						<small className='text-black dark:text-white'>{province.value}</small>
					</div>
					<div className='flex gap-1 p-5 items-center'>
						<Icon name='contract' className='h-6 w-6 text-primary-1' />
						<small className='text-black dark:text-white'>{contractType.value}</small>
					</div>
					<div className='flex gap-1 p-5 items-center'>
						<Icon name='remote' className='h-6 w-6 text-primary-1' />
						<small className='text-black dark:text-white'>
							{teleworking ? teleworking.value : 'N/A'}
						</small>
					</div>
				</div>
				<div className='p-5'>
					<p className='text-black dark:text-white'>
						Experiencia requerida:{' '}
						<span className='text-primary-1 font-bold'>{experienceMin.value}</span>
					</p>
					<Button>Ver oferta</Button>
				</div> */}
			</article>
		</li>
	);
};

export default OfferCard;
