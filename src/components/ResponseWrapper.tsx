import { useEffect, useRef } from 'react';

const ResponseWrapper = ({ html }: { html: string }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) ref.current.innerHTML = html;
	});

	return <div ref={ref} className='gpt-response p-10' />;
};

export default ResponseWrapper;
