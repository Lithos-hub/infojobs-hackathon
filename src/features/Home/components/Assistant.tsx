import { FC, useEffect, useRef, useState } from 'react';

import { Formik } from 'formik';
import { motion } from 'framer-motion';

import { useChatGPT } from '@/services/apis';

import { Button, Icon, Loader, Textarea } from '@/components';

interface Props {
	onClose: () => void;
}

const ResponseWrapper = ({ html }: { html: string }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) ref.current.innerHTML = html;
	});

	return <div ref={ref} className='gpt-response p-10' />;
};

const Assistant: FC<Props> = ({ onClose }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isError, setIsError] = useState(false);
	const [gptResponse, setGptResponse] = useState('');

	const loadingMessages = [
		'¡Interesante! Veamos cómo podemos ayudarte... 🕵️',
		'Estoy preparando mi informe 📝',
		'Esto se puede demorar unos instantes ⏳',
		'Generando respuesta... 🔥',
		'¡Ahora sí que sí! 🚀',
	];

	const onRetry = () => {
		setIsFinished(false);
		setIsError(false);
		setIsSubmitting(false);
		setGptResponse('');
	};

	return (
		<>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				className='fixed top-0 h-screen w-screen bg-black/50 backdrop-blur z-50'
				onClick={onClose}
			/>
			<motion.div
				ref={wrapperRef}
				initial={{
					opacity: 0,
					top: '100%',
				}}
				animate={{
					opacity: 1,
					top: '50%',
					type: 'spring',
				}}
				transition={{
					duration: 0.5,
					type: 'spring',
					stiffness: 80,
				}}
				className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] min-h-[500px] rounded-[30px] flex flex-col justify-between 
			gap-5 px-10 bg-slate-200 dark:bg-slate-950 shadow-xl shadow-black/30 backdrop-blur z-50'
			>
				<Icon
					name='close'
					onClick={onClose}
					className='h-7 w-7 text-black dark:text-white absolute top-10 right-10'
				/>

				{/* Conditional flow:
				1. Show a textarea to write the question (isFinished = false && isSubmitting = false)
				2. Show the Loader (isSubmitting = true && isFinished = false)
				2-a. If error, show error message (isError = true && isSubmitting = false)
				4. Show the answer by chatGPT (isFinished = true && isSubmitting = false)
				5. If the user wants to ask another question, go to step 1 (click on Reintentar button)

			*/}

				{!isFinished && !isSubmitting ? (
					<section className='pt-20'>
						<img
							src='/img/assistant-robot.png'
							className='absolute top-20 left-20 mix-blend-color-multiply w-[200px] rounded-br-[30px]'
						/>
						<div className='relative speech-bubble flex flex-col gap-2 bg-primary-1 dark:bg-cyan-900/50 w-auto text-left rounded-[30px] p-5 ml-[230px]'>
							<h2 className='text-lg md:text-xl font-bold text-white dark:text-primary-1'>
								¡Hola! Soy tu{' '}
								<span className='text-cyan-300 dark:text-cyan-500'>asistente laboral</span> virtual
							</h2>
							{!isFinished && !isSubmitting && (
								<p className='font-light text-white'>
									Escribe en el cuadro de texto de abajo las dudas que tengas acerca del mundo
									laboral, cuestiones legales, etc. También puedo darte consejos para mejorar tu
									currículum o para prepararte para una entrevista de trabajo.
								</p>
							)}
						</div>
						<Formik
							initialValues={{
								question: '',
							}}
							onSubmit={async (values, { resetForm }) => {
								try {
									setIsSubmitting(true);
									const response = (await useChatGPT({
										type: 'job-assistant',
										message: values.question,
									})) as string;
									setGptResponse(response);
									resetForm();
									setIsFinished(true);
								} catch (error) {
									setIsError(true);
									setIsFinished(true);
								} finally {
									setIsSubmitting(false);
								}
							}}
						>
							{({ values, handleSubmit, getFieldProps }) => (
								<form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-28'>
									<Textarea
										{...getFieldProps(values.question)}
										autoFocus
										className='w-full h-[200px]'
										placeholder={`Escribe aquí tu pregunta. Te dejo unos ejemplos aquí debajo: \n\n¿Qué es un contrato de trabajo? \n¿Cuántos tipos de contratos de trabajo hay en España? \n¿Cómo puedo mejorar mi currículum? \nNecesito consejos para afrontar una entrevista de trabajo en el sector farmacéutico`}
										name='question'
										value={values.question}
									/>
									<Button className='mx-auto' type='submit'>
										Enviar
									</Button>
								</form>
							)}
						</Formik>
						<div />
					</section>
				) : isFinished && !isSubmitting ? (
					<section className='flex flex-col justify-between h-full gap-10'>
						<div />
						<section className='max-h-[400px] w-full mx-auto overflow-y-auto shadow-xl rounded-l-[30px] bg-black/80 backdrop-blur border border-slate-700/50'>
							<ResponseWrapper html={gptResponse} />
						</section>
						<div className='flex flex-col gap-5 items-center'>
							<h3 className='text-lg'>¿Puedo ayudarte en algo más? 😊</h3>
							<div className='flex gap-5'>
								<Button className='mx-auto' onClick={onRetry}>
									Volver a preguntar
								</Button>
								<Button variant='secondary' className='mx-auto' onClick={onClose}>
									Cerrar
								</Button>
							</div>
						</div>
					</section>
				) : isSubmitting && !isFinished ? (
					<section className='h-[500px]'>
						<Loader messages={loadingMessages} loaderType='horizontal' displayRobot />
					</section>
				) : isError ? (
					<section className='flex flex-col gap-5'>
						<h3 className='text-xl text-center text-white w-[50vw] mx-auto'>
							¡Ha ocurrido un error! Por favor, inténtalo de nuevo más tarde.
						</h3>
						<Button className='mx-auto' onClick={onRetry}>
							Reintentar
						</Button>
					</section>
				) : null}

				<div />
			</motion.div>
		</>
	);
};

export default Assistant;
