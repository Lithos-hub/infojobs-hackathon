import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useWhisper } from '@chengsokdara/use-whisper';
import { Formik } from 'formik';

import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

import Icon from './Icon';
import Textarea from './Textarea';
import Loader from './Loader';
import Button from './Button';

import AudioRecorder from '@/features/Home/components/AudioRecorder';
import { useChatGPT } from '@/services/apis';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

const SearchBox: FC<Props> = ({ ...rest }) => {
	const navigate = useNavigate();

	const { speaking, recording, transcript, startRecording, stopRecording } = useWhisper({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		streaming: true,
		timeSlice: 1_000,
		whisperConfig: {
			language: 'es',
		},
		removeSilence: true,
	});

	const [isFinished, setIsFinished] = useState(false);
	const [isError, setIsError] = useState(false);

	const loadingMessages = [
		'Buscando las ofertas que mejor encajen con tu descripción... 🕵️',
		'Generando resultados... 📝',
		'Esto se puede demorar unos instantes ⏳',
		'Redirigiendo a la página de resultados... 🔥',
	];

	const onRetry = () => {
		setIsFinished(false);
		setIsError(false);
	};

	const toggleRecording = () => (recording ? stopRecording() : startRecording());

	let debounce: TimeoutId;

	useEffect(() => {
		if (recording && !speaking) {
			clearTimeout(debounce);
			debounce = setTimeout(() => {
				stopRecording();
			}, 7000);
		}
	}, [speaking]);

	return (
		<div className='relative'>
			<Formik
				initialValues={{
					searchQuery: '',
				}}
				onSubmit={async values => {
					const response = (await useChatGPT({
						type: 'search-assistant',
						message: values.searchQuery || (transcript.text as string),
					})) as string;

					navigate(`/offers?${response}`);
					setIsFinished(true);
				}}
			>
				{({ values, handleSubmit, getFieldProps, isSubmitting }) => (
					<form onSubmit={handleSubmit} className='text-center'>
						{!isFinished && !isSubmitting ? (
							<>
								<Textarea
									{...rest}
									{...getFieldProps(values.searchQuery)}
									autoFocus
									name='searchQuery'
									value={values.searchQuery || transcript.text}
								/>
								<div className='flex items-center gap-5 absolute top-5 right-5'>
									<AudioRecorder recording={recording} onClick={() => toggleRecording()} />
									<button type='submit'>
										<Icon
											name='magnify'
											className='h-10 w-10 cursor-pointer text-black dark:text-white'
										/>
									</button>
								</div>
							</>
						) : isFinished && !isSubmitting && !isError ? (
							<section className='text-center flex flex-col gap-5'>
								<p>Pulsa en el siguiente botón para llevarte a las ofertas.</p>
								<Link to='/offers'>
									<Button>Ver ofertas</Button>
								</Link>
								<Button className='mx-auto' variant='secondary' onClick={onRetry}>
									Volver a probar
								</Button>
							</section>
						) : isSubmitting && !isFinished ? (
							<>
								<Loader messages={loadingMessages} size='small' loaderType='horizontal' />
							</>
						) : isError ? (
							<div className='flex flex-col gap-5'>
								<p className='text-red-500'>
									Lo siento, no hemos encontrado ofertas disponibles para tu descripción
								</p>
								<Button className='mx-auto' variant='secondary' onClick={onRetry}>
									Volver a probar
								</Button>
							</div>
						) : null}
					</form>
				)}
			</Formik>
		</div>
	);
};

export default SearchBox;
