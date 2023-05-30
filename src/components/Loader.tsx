import { FC, useEffect, useMemo, useState } from 'react';

interface Props {
	messages: string[];
	loaderType?: 'horizontal' | 'circular';
	size?: 'small' | 'medium' | 'large';
	displayRobot?: boolean;
}

const Loader: FC<Props> = ({ messages, loaderType, size, displayRobot = false }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (index < messages.length - 1) {
				setIndex((prev: number) => prev + 1);
			} else {
				setIndex(messages.length - 1);
			}
		}, 7000);
		return () => clearInterval(interval);
	}, []);

	const loadingMessage = useMemo(
		() => (index < messages.length ? messages[index] : messages[messages.length - 1]),
		[index, messages]
	);

	const textSize = useMemo(() => {
		const options = {
			small: 'text-sm',
			medium: 'text-lg',
			large: 'text-2xl',
		};
		return options[size || 'medium'];
	}, [size]);

	return (
		<div className='flex flex-col justify-center items-center gap-10 h-full'>
			<span className={`loader-${loaderType}`} />
			{displayRobot && <img src='/img/assistant-robot.png' className='h-[250px]' />}
			<p className={`text-primary-1 500 ${textSize}`}>{loadingMessage}</p>
		</div>
	);
};

export default Loader;
