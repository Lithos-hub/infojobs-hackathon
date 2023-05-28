import React, { FC } from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

const Textarea: FC<Props> = props => {
	return (
		<textarea
			{...props}
			className={`p-5 rounded-xl resize-none min-h-[150px] border border-primary-1/50 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-1 focus:ring-offset-1 focus:ring-offset-primary-1/10 duration-200 text-xs md:text-sm lg:text-base dark:bg-primary-1/10 ${props.className}`}
		/>
	);
};

export default Textarea;
