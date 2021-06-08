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

			<VideoChart videoData={data ?? []} />
		</>
	);
};
export default Video;
