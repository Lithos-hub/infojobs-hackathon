import { useState, useEffect } from 'react';
import axios from 'axios';
import { Offer } from '@/models';

export const useInfiniteScroll = (url: string) => {
	const [data, setData] = useState<Offer[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchData(); // Initial data fetch
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!isLoading) return;
		fetchData();
	}, [isLoading]);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(`${url}&page=${page}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${import.meta.env.VITE_FULL_SECRET}`,
				},
			});
			const newData = data.offers;
			setData(prevData => [...prevData, ...newData]);
			setPage(prevPage => prevPage + 1);
			setIsLoading(false);
		} catch (error) {
			console.log('Error fetching data:', error);
			setIsLoading(false);
		}
	};

	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
			setIsLoading(true);
		}
	};

	return { data, isLoading };
};
