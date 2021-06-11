import React from 'react';
import {HiExclamationCircle} from "react-icons/all";

const ErrorMessage: React.FC = () => {
	return (
		<div>
			<div className='w-full px-4 p-20'>
				<h1 className='text-center text-2xl'>
					Connection to server failed <HiExclamationCircle/>
				</h1>
			</div>
		</div>
	);
};

export default ErrorMessage;
