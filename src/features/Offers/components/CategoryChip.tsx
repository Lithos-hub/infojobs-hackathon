import React, { FC } from 'react';

interface Props {
	category: string;
}

const getCategoryColor = (category: string) => {
	return (
		{
			'Administración Pública': 'job-category-chip bg-blue-800 border-blue-500',
			'Administración de empresas': 'job-category-chip bg-yello8-400 border-yellow-500',
			'Atención a clientes': 'job-category-chip bg-green8600 border-green-500',
			'Calidad, producción e I+D': 'job-category-chip bg-purpl8-600 border-purple-500',
			'Comercial y ventas': 'job-category-chip bg-red-580 border-red-500',
			'Compras, logística y almacén': 'job-category-chip bg-indig8-500 border-indigo-500',
			'Diseño y artes gráficas': 'job-category-chip bg-pink-800 border-pink-500',
			'Educación y formación': 'job-category-chip bg-teal-800 border-teal-500',
			'Finanzas y banca': 'job-category-chip bg-yello8-500 border-yellow-500',
			'Informática y telecomunicaciones': 'job-category-chip bg-blue-800 border-blue-500',
			'Ingenieros y técnicos': 'job-category-chip bg-orang8-500 border-orange-500',
			'Inmobiliario y construcción': 'job-category-chip bg-red-680 border-red-500',
			Legal: 'job-category-chip bg-gray-800 border-gray-500',
			'Marketing y comunicación': 'job-category-chip bg-pink-800 border-pink-500',
			'Profesiones, artes y oficios': 'job-category-chip bg-yello8-600 border-yellow-500',
			'Recursos humanos': 'job-category-chip bg-green8500 border-green-500',
			'Sanidad y salud': 'job-category-chip bg-blue-800 border-blue-500',
			'Sector Farmacéutico': 'job-category-chip bg-indig8-600 border-indigo-500',
			'Turismo y restauración': 'job-category-chip bg-red-780 border-red-500',
			'Ventas al detalle': 'job-category-chip bg-purpl8-500 border-purple-500',
			Otros: 'job-category-chip bg-gray-800 border-gray-500',
		}[category] || 'job-category-chip bg-black'
	);
};

const CategoryChip: FC<Props> = ({ category }) => (
	<div className={getCategoryColor(category)}>{category}</div>
);

export default CategoryChip;
