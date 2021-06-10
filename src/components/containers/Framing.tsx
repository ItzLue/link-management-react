import React from 'react';
import { IFramingData } from '../../types/api/data';
import FramingChart from "../charts/FramingChart";

type IProps = { data?: IFramingData[] };

const Framing: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='w-full px-4 pt-5'>
				<h1 className='text-center text-2xl'>
					FRAMING DATA
				</h1>
			</div>

			<FramingChart framingData={data ?? []}/>
		</div>
	);
};

export default Framing;
