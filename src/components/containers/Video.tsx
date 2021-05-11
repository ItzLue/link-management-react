import React from 'react';
import { IVideoData } from '../../types/api/data';

type IProps = { data?: IVideoData[] };

const Video: React.FC<IProps> = ({ data }) => {
	return (
		<>
			<div className='text-center'>
				<p>VIDEO DATA</p>
			</div>
			<div className='text-center bg-blue-400 h-full'>
				<p>ping {data?.[0].ping}</p>
				<p>bitrate {data?.[0].bitrate}</p>
			</div>
		</>
	);
};
export default Video;
