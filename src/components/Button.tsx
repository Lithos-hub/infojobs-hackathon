import React, { FC, useMemo } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	variant?: 'primary' | 'secondary';
}

const Button: FC<Props> = ({ children, className, onClick, variant = 'primary' }) => {
	const variantClass = useMemo(() => {
		const variants = {
			primary: 'bg-primary-1 text-white',
			secondary: 'text-black border border-black bg-transparent dark:border-[#ccc] dark:text-white',
		};
		return variants[variant];
	}, [variant]);

	return (
		<button
			onClick={onClick}
			className={`font-bold py-2 px-5 rounded-full hover:brightness-125 duration-200 ${variantClass} ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
