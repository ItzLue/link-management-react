import React from 'react';
import { HiExclamationCircle } from 'react-icons/all';

const ErrorMessage: React.FC = () => {
	return (
		<div className='w-full fixed top-0 h-6 shadow-md border z-10 bg-red-500'>
			<h1 className=' inline text-white'>
				Connection to server failed <HiExclamationCircle />
			</h1>
		</div>
	);
};

export default ErrorMessage;
