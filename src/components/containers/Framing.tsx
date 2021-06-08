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

			<FramingChart framingData={data ?? []}/>
		</div>
	);
};

export default Framing;
