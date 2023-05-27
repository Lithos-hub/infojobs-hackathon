import { Button, Icon, Overlay, Textarea } from '@/components';
import { Formik } from 'formik';
import { FC, useMemo } from 'react';

interface Props {
	onClose: () => void;
	questionsList: string[];
}

interface InitialValues {
	[key: string]: string;
}

const SkillsTest: FC<Props> = ({ onClose, questionsList }) => {
	const initialValues = useMemo(
		() =>
			questionsList.reduce((acc, _, index) => {
				acc[`question-${index}`] = '';
				return acc;
			}, {} as InitialValues),
		[questionsList]
	);

	const onSubmit = (values: InitialValues) => {
		console.log(values);
	};

	return (
		<>
			<Overlay onClose={onClose} />
			<div className='fixed top-1/2 left-1/2 -translate-x-1/2 h-screen w-screen md:h-[90vh] md:w-[80vw] shadow-2xl p-10 md:rounded-[30px] -translate-y-1/2 bg-white dark:bg-slate-900 dark:text-white z-50'>
				<Icon
					name='close'
					onClick={onClose}
					className='h-7 w-7 text-black dark:text-white absolute top-10 right-10'
				/>
				<h2>Test de aptitudes</h2>
				<p className='text-base text-primary-1 text-center mx-auto w-[500px] mt-10'>
					Contesta a las siguientes preguntas y pon a prueba tus conocimientos sobre las habilidades
					que se requieren en esta oferta de empleo. ¡Mucha suerte!
				</p>
				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ values, handleChange, handleBlur, handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
							<div className='max-h-[600px] md:max-h-[500px] mx-auto w-full mt-10 overflow-y-auto p-5'>
								<div className='flex flex-col gap-5'>
									{questionsList.map((question, index) => (
										<>
											<p>{question}</p>
											<Textarea
												key={index}
												name={`question-${index}`}
												label={`Pregunta ${index + 1}`}
												placeholder='Escribe tu respuesta...'
												onChange={handleChange}
												onBlur={handleBlur}
												value={values[`question-${index}`]}
											/>
										</>
									))}
								</div>
								<Button type='submit' className='mt-10 w-full'>
									Enviar respuestas
								</Button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default SkillsTest;
