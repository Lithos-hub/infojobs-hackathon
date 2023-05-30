import { FC, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useWhisper } from '@chengsokdara/use-whisper';
import { Formik, FormikProps } from 'formik';

import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

import Icon from './Icon';
import Textarea from './Textarea';
import Loader from './Loader';
import Button from './Button';

import AudioRecorder from '@/features/Home/components/AudioRecorder';
import { useChatGPT } from '@/services/apis';

import * as Yup from 'yup';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

const SearchBox: FC<Props> = ({ ...rest }) => {
	const formikRef = useRef<
		FormikProps<{
			searchQuery: string;
		}>
	>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const navigate = useNavigate();

	const [isFinished, setIsFinished] = useState(false);
	const [isError, setIsError] = useState(false);

	const { speaking, recording, transcript, startRecording, stopRecording } = useWhisper({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		streaming: true,
		timeSlice: 1_000,
		whisperConfig: {
			language: 'es',
		},
		removeSilence: true,
	});

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

	const onDispatchSubmit = () => formRef.current?.dispatchEvent(new Event('submit'));

	const toggleRecording = () => (recording ? stopRecording() : startRecording());

	const validationSchema = Yup.object().shape({
		searchQuery: Yup.string().required('No has introducido ningún criterio de búsqueda'),
	});

	useEffect(() => {
		let debounce: TimeoutId;

		// Debounce to set the message and submit the form after 5 seconds of not speaking
		if (recording && !speaking) {
			debounce = setTimeout(() => {
				stopRecording();
				formikRef.current?.setFieldValue('searchQuery', transcript.text);
				onDispatchSubmit();
			}, 5000);
		}

		return () => clearTimeout(debounce);
	}, [speaking, transcript.text]);

	return (
		<div className='relative'>
			<Formik
				innerRef={formikRef}
				enableReinitialize={true}
				initialValues={{
					searchQuery: '',
				}}
				validationSchema={validationSchema}
				onSubmit={async values => {
					console.log('Submitting...');
					const response = (await useChatGPT({
						type: 'search-assistant',
						message: values.searchQuery,
					})) as string;

					navigate(`/offers?${response}`);
					setIsFinished(true);
				}}
			>
				{({ values, handleSubmit, errors, getFieldProps, isSubmitting }) => (
					<form ref={formRef} onSubmit={handleSubmit} className='text-center'>
						{!isFinished && !isSubmitting ? (
							<>
								<Textarea
									{...rest}
									{...getFieldProps(values.searchQuery)}
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
								<div className='flex flex-col gap-2'>
									<small className='text-red-500'>{errors.searchQuery}</small>
									{(transcript.text && transcript.text.length > 0) || recording ? (
										<small className='text-black dark:text-cyan-500 font-semibold text-xs text-center mx-20'>
											* Cuando termines de hablar, <strong>espera unos segundos</strong> para que
											podamos procesar tu voz correctamente y enviar la solicitud de búsqueda. Si lo
											deseas{' '}
											<strong>
												puedes finalizar manualmente la grabación pulsando en el micrófono de nuevo
												y buscar pulsando en la lupa.
											</strong>
										</small>
									) : null}
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
