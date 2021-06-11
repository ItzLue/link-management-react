import React from 'react';
import {HiExclamationCircle} from "react-icons/all";

const ErrorMessage: React.FC = () => {
	return (
		<div>
			<div className='w-full px-4 p-10'>
				<h1 className='text-center text-2xl'>
					<HiExclamationCircle className='mr-2 inline'/> Connection to server failed
				</h1>
			</div>
		</div>
	);
};

export default ErrorMessage;
