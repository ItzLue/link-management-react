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

			<div className='text-red-500 m-4'>
				<p>
					The bitrate is the number of bits that are conveyed per unit of time in the data
				</p>
			</div>

			<div className='text-green-300 m-4'>
				<p>
					The ping measures the minimum time needed to send the smallest amount of data and receive response
				</p>
			</div>

			<VideoChart videoData={data ?? []} />
		</>
	);
};
export default Video;
