import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getOffers } from '@/services/apis';
import { Offer } from '@/models';
import { OfferCard } from './components';
import { Button, Loader } from '@/components';
import { Link } from 'react-router-dom';

const OffersListPage = () => {
	const { search } = useLocation();

	const [loading, setLoading] = useState(true);
	const [offers, setOffers] = useState<Offer[] | null>(null);

	const getOffersFromURL = async () => {
		const response = await getOffers(search);
		if (response) setOffers(response.data.offers);

		setLoading(false);
	};

	useEffect(() => {
		getOffersFromURL();
	}, [search]);

	return (
		<section className='pt-[10vh]'>
			<h1 className='text-2xl text-primary-1 dark:text-white font-bold text-center'>
				Resultado de la búsqueda:
			</h1>
			{loading ? (
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<Loader loaderType='circular' size='large' messages={['Cargando...']} />
				</div>
			) : (
				<div className='p-10 rounded-[30px]'>
					<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
						{offers && offers.length ? (
							offers.map((offer: Offer) => {
								return (
									<Link key={offer.id} to={`/offer/${offer.id}`}>
										<OfferCard {...offer} />
									</Link>
								);
							})
						) : (
							<div className='text-red-500 text-center flex flex-col gap-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
								<p>Lo siento, no hemos encontrado ofertas con esa descripción.</p>
								<Link to='/'>
									<Button className='mx-auto' variant='secondary'>
										Regresar al inicio
									</Button>
								</Link>
							</div>
						)}
					</ul>
				</div>
			)}
		</section>
	);
};

export default OffersListPage;
