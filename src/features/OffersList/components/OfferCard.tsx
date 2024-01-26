import { Icon } from '@/components';
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
	const simplifiedTitle = useMemo(
		() => (title.length > 50 ? `${title.slice(0, 35)}...` : title),
		[author.name]
	);
	return (
		<li
			key={id}
			className='shadow-xl shadow-black/30 h-full hover:scale-105 duration-200 cursor-pointer rounded-[30px] overflow-hidden'
		>
			<article className=' bg-primary-1 dark:bg-slate-900 overflow-hidden w-full h-full relative'>
				<div className='absolute top-0 right-0 w-full'>
					<CategoryChip category={category.value} />
				</div>
				<div className='relative flex flex-col justify-between h-full pt-7'>
					<div className='p-5'>
						<div className='flex justify-between items-start'>
							<div className='flex flex-col gap-2'>
								<img src={author.logoUrl} className='w-20 h-20 object-cover rounded bg-white' />
							</div>
							<div className='flex flex-col gap-3 text-white text-right'>
								<small>Experiencia: {experienceMin.value}</small>
								<small className='text-white text-xs'>Publicado el {publishedDate}</small>
								<div className='flex self-end'>
									<Icon name='location' className='h-5 w-5' />
									<small>{province.value}</small>
								</div>
							</div>
						</div>
						<div className='py-5 flex flex-col'>
							<h2 className='text-black dark:text-cyan-500 font-bold text-xs'>{author.name}</h2>
							<h3 className='text-white font-bold text-lg'>{simplifiedTitle}</h3>
						</div>
					</div>
					<div className='bg-slate-900 p-3 mx-auto w-full flex flex-wrap gap-3 justify-center items-center text-white dark:text-cyan-500 text-center'>
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
			</article>
		</li>
	);
};

export default OfferCard;
