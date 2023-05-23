import Icon from '@/components/Icon';
import { FC } from 'react';

interface Props {
	recording: boolean;
	onClick?: () => void;
}

const AudioRecorder: FC<Props> = ({ recording, onClick }) => (
	<Icon
		name='microphone'
		className={`h-8 w-8 mb-2 p-1 cursor-pointer text-black dark:text-white rounded-full ${
			recording && 'recording'
		}`}
		onClick={onClick}
	/>
);

export default AudioRecorder;
