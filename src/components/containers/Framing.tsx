import React from 'react';
import { IFramingData } from '../../types/api/data';
import FramingChart from "../charts/FramingChart";

type IProps = { data?: IFramingData[] };

const Framing: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='text-center'>
				<p>FRAMING DATA</p>
			</div>
			<div className='text-center bg-green-300 h-full'>
				<p>Errors detected {data?.[data?.length - 1].errorsDetected}</p>
				<p>Errors corrected {data?.[data?.length - 1].errorsCorrected}</p>
			</div>
			<FramingChart framingData={data ?? []}/>
		</div>
	);
};

export default Framing;
