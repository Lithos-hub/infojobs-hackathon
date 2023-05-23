import { FC } from 'react';
import Icon from './Icon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	onSearch?: () => void;
}

const SearchField: FC<Props> = ({ onSearch, ...rest }) => {
	return (
		<div className='relative'>
			<input
				{...rest}
				className={`bg-primary-1/10 p-3 pl-5 rounded-full border border-primary-1/50 
				focus:outline-none focus:ring-1 focus:ring-primary-1 focus:ring-offset-1 
				focus:ring-offset-primary-1/10 duration-200 text-xs md:text-sm 
				lg:text-base ${rest.className}`}
			/>
			<div
				className='flex items-center gap-5 absolute top-1/2 
				transform right-5 -translate-y-1/2'
			>
				<Icon name='microphone' className='h-6 w-6' />
				<Icon name='magnify' className='h-6 w-6' onClick={onSearch} />
			</div>
		</div>
	);
};

export default SearchField;
