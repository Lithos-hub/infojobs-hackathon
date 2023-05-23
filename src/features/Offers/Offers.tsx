import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getOffers } from '@/services/apis';
import { Offer } from '@/models';
import { OfferCard } from './components';

const Offers = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const [offers, setOffers] = useState<Offer[] | null>(null);

	const getOffersFromURL = async () => {
		const response = await getOffers(search);
		if (response) {
			setOffers(response.data.offers);

			if (!response.data.offers.length) {
				setTimeout(() => {
					navigate('/');
				}, 5000);
			}
		}
	};

	useEffect(() => {
		getOffersFromURL();
	}, [search]);

	return (
		<section className='pt-[10vh]'>
			<h1 className='text-2xl text-primary-1 dark:text-white font-bold text-center'>
				Resultado de la búsqueda:
			</h1>
			<div className='p-10 rounded-[30px]'>
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
					{offers && offers.length ? (
						offers.map((offer: Offer) => {
							return <OfferCard key={offer.id} {...offer} />;
						})
					) : (
						<div className='text-red-500'>
							Lo siento, no hemos encontrado ofertas con esa descripción.
							<p className='text-primary-1'>Redirigiendo a la página de inicio...</p>
						</div>
					)}
				</ul>
			</div>
		</section>
	);
};

export default Offers;
