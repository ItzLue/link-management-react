import React from 'react';
import { IParsedTransmission } from '../../types/api/data';
import { FramingChartStackBar } from '../charts/FramingChart';

type IProps = { data?: IParsedTransmission[] };

const Framing: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='w-full px-4 p-5'>
				<h1 className='text-center text-2xl'>FRAMING DATA</h1>
			</div>

			<FramingChartStackBar transmissionData={data ?? []} />
		</div>
	);
};

export default Framing;
