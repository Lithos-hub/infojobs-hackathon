import axios from 'axios';

export const getOffers = async (params: string) => {
	try {
		return await axios.get(`${import.meta.env.VITE_BASE_URL}${params}`);
	} catch (error) {
		console.log('Error getting offers list: ', error);
	}
};

export const getOffer = async (id: string) => {
	try {
		return await axios.get(`${import.meta.env.VITE_BASE_URL}/${id}`);
	} catch (error) {
		console.log('Error getting offer details: ', error);
	}
};
