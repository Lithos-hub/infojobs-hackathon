import { FC } from 'react';

import { ResponseWrapper } from '@/components';

interface Props {
	html: string;
}

const Evaluation: FC<Props> = ({ html }) => {
	return (
		<>
			<div className='flex flex-col h-full items-center justify-center gap-5'>
				<ResponseWrapper html={html} />
			</div>
		</>
	);
};

export default Evaluation;
