import React from 'react';
import { IFramingData } from '../../types/api/data';

type IProps = { data?: IFramingData[] };

const Framing: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='text-center'>
				<p>FRAMING DATA</p>
			</div>
			<div className='text-center bg-green-300 h-full'>
				<p>Errors detected {data?.[0].errorsDetected}</p>
				<p>Errors corrected {data?.[0].errorsCorrected}</p>
			</div>
		</div>
	);
};

export default Framing;
