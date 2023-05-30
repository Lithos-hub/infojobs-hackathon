import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Offer } from '@/models';
import { getOffers } from '@/services/apis';

export const useInfiniteScroll = (params: string) => {
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
			const { data } = (await getOffers(`${params}&page=${page}`)) as AxiosResponse<Offer[]>;
			setData(prevData => [...prevData, ...data]);
			setPage(prevPage => prevPage + 1);
		} catch (error) {
			console.log('Error fetching data:', error);
			setIsLoading(false);
		} finally {
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
