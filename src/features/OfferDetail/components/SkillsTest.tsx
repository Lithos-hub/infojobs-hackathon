import { FC, useMemo, useState } from 'react';
import { Formik } from 'formik';

import { useChatGPT } from '@/services/apis';

import { Button, Icon, Loader, Overlay, Textarea } from '@/components';
import Evaluation from './Evaluation';

import * as Yup from 'yup';

interface Props {
	onClose: () => void;
	questionsList: string[];
}

interface InitialValues {
	[key: string]: string;
}

const SkillsTest: FC<Props> = ({ onClose, questionsList }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isError, setIsError] = useState(false);

	const [gptResponse, setGptResponse] = useState('');

	const initialValues = useMemo(
		() =>
			questionsList.reduce((acc, _, index) => {
				acc[`question-${index}`] = '';
				return acc;
			}, {} as InitialValues),
		[questionsList]
	);

	const onSubmit = async (values: InitialValues) => {
		try {
			setIsSubmitting(true);

			const res = (await useChatGPT({
				type: 'evaluator-assistant',
				message: `
					Preguntas y respuestas:
					${questionsList
						.map(
							(question, index) => `
						Pregunta: ${question}
						Respuesta: ${values[`question-${index}`]}
					`
						)
						.join('')}
				`,
			})) as string;

			// If the response has the word "error" between three &&& signs, it means that an error has occurred
			if (res.includes('&&&error')) {
				setIsError(true);
				return;
			}

			setGptResponse(res);
		} catch (error) {
			console.log(error);
			setIsError(true);
		} finally {
			setIsSubmitting(false);
			setIsFinished(true);
		}
	};

	const validationSchema = useMemo(
		() =>
			Yup.object().shape(
				questionsList.reduce((acc, _, index) => {
					const key = `question-${index}` as string;
					acc[key] = Yup.string().required('Este campo es obligatorio');
					return acc;
				}, {} as Yup.ObjectShape)
			),
		[questionsList]
	);

	return (
		<>
			<Overlay onClose={onClose} />
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 h-screen w-screen md:h-auto md:w-[80vw] shadow-2xl p-10 md:rounded-[30px] -translate-y-1/2 bg-white dark:bg-slate-900 dark:text-white z-50'>
				<Icon
					name='close'
					onClick={onClose}
					className='h-7 w-7 text-black dark:text-white absolute top-10 right-10'
				/>
				{
					// Conditional flow:
					// 1. Show the test (isFinished = false && isSubmitting = false)
					// 2. Show the Loader (isSubmitting = true && isFinished = false)
					// 2-a. If error, show error message (isError = true && isSubmitting = false)
					// 3. Show the evaluation (isFinished = true && isSubmitting = false)

					!isFinished && !isSubmitting ? (
						<section>
							<h2 className='text-3xl'>Test de aptitudes</h2>
							<p className='text-base text-primary-1 text-center mx-auto mt-10'>
								Responde a las siguientes preguntas para que podamos conocer mejor tus aptitudes.
								Todas las preguntas son obligatorias. Si no conoces la respuesta, simplemente
								escribe <strong>"No lo sé"</strong> o <strong>"Lo desconozco"</strong> <br /> ¡Mucha
								suerte!
							</p>
							<Formik
								initialValues={initialValues}
								onSubmit={onSubmit}
								validationSchema={validationSchema}
							>
								{({ values, handleChange, handleSubmit, errors }) => (
									<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
										<div className='max-h-[600px] md:max-h-[500px] mx-auto w-full mt-10 overflow-y-auto p-5'>
											<div className='flex flex-col gap-5'>
												{questionsList.map((question, index) => (
													<div key={index} className='flex flex-col gap-3'>
														<strong>{question}</strong>
														<Textarea
															name={`question-${index}`}
															label={`Pregunta ${index + 1}`}
															placeholder='Escribe tu respuesta...'
															onChange={handleChange}
															value={values[`question-${index}`]}
														/>
														<small className='text-red-500'>{errors[`question-${index}`]}</small>
													</div>
												))}
											</div>
											<Button type='submit' className='mt-10 w-full'>
												Enviar respuestas
											</Button>
										</div>
									</form>
								)}
							</Formik>
						</section>
					) : isSubmitting ? (
						<div className='flex flex-col h-full items-center justify-center gap-5'>
							<Loader
								loaderType='horizontal'
								messages={[
									'Estamos procesando tus respuestas',
									'Tardaremos unos instantes en darte una evaluación',
									'Procesando...',
									'Calculando una puntuación...',
								]}
							/>
						</div>
					) : isFinished && !isError ? (
						<Evaluation html={gptResponse} />
					) : isError ? (
						<div className='flex flex-col gap-5'>
							<h2 className='text-red-500'>
								Se ha producido un error inesperado. Vuelve a intentar el test más tarde
							</h2>
						</div>
					) : null
				}
			</div>
		</>
	);
};

export default SkillsTest;
