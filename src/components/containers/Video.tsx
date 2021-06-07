import React from 'react';
import { IVideoData } from '../../types/api/data';
import VideoChart from '../charts/VideoChart';

type IProps = { data?: IVideoData[] };

const Video: React.FC<IProps> = ({ data }) => {
	return (
		<>
			<div className='text-center'>
				<p>VIDEO DATA</p>
			</div>
			<div className='text-center bg-blue-400 h-full'>
				<p>ping {data?.[data?.length - 1].ping}</p>
				<p>bitrate {data?.[data?.length - 1].bitrate}</p>
			</div>

			<VideoChart videoData={data ?? []} />
		</>
	);
};
export default Video;
