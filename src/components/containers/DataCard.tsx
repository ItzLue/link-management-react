import React from 'react';

type IProps = { title: string };

const DataCard: React.FC<IProps> = ({ title, children }) => {
	return (
		<div className='rounded-3xl border border-gray-100 w-full bg-green-500 text-center'>
			<h2 className='mb-4'>{title}</h2>
			{children}
		</div>
	);
};
export default DataCard;
