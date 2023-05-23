import { FC } from 'react';
import icons from '@/assets/icons/icons.svg';

interface Props {
	name: string;
	className?: string;
	onClick?: () => void;
}

const Icon: FC<Props> = ({ name, className, onClick }) => {
	return (
		<svg className={`${onClick && 'cursor-pointer'} ${className}`} onClick={onClick}>
			<use xlinkHref={`${icons}#${name}`} />
		</svg>
	);
};

export default Icon;
