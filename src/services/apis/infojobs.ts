import axios from 'axios';

export const getOffers = async (params: string) => {
	try {
		return await axios.get(`https://api.infojobs.net/api/api/9/offer${params}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${import.meta.env.VITE_FULL_SECRET}`,
			},
		});
	} catch (error) {
		console.log('ERROR: ', error);
	}
};

export const getOffer = async (id: string) => {
	try {
		return await axios.get(`https://api.infojobs.net/api/api/7/offer/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${import.meta.env.VITE_FULL_SECRET}`,
			},
		});
	} catch (error) {
		console.log('ERROR: ', error);
	}
};
