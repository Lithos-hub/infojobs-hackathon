import axios from 'axios';

export const getOffers = async (params: string) => {
	try {
		const res = await axios.get(`/api/api/9/offer${params}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${import.meta.env.VITE_FULL_SECRET}`,
			},
		});
		return await res;
	} catch (error) {
		console.log('ERROR: ', error);
	}
};
