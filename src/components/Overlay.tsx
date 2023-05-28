import { FC } from 'react';
import { motion } from 'framer-motion';

interface Props {
	onClose?: () => void;
}

const Overlay: FC<Props> = ({ onClose }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			className='fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur z-50'
			onClick={onClose}
		/>
	);
};

export default Overlay;
