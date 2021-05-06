import React from 'react';
import { IFramingData } from '../../types/api/data';

type IProps = { data?: IFramingData };

const Framing: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='text-center'>
				<p>FRAMING DATA</p>
			</div>
			<div className='text-center bg-green-300 h-full'>
				<p>Errors detected {data?.errorsDetected}</p>
				<p>Errors corrected {data?.errorsCorrected}</p>
			</div>
		</div>
	);
};

export default Framing;
