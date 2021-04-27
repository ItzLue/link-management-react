import React from 'react';
import { IVideoData } from '../../types/api/data';

type IProps = { data?: IVideoData };

const Video: React.FC<IProps> = ({ data }) => {
	return (
		<>
			<div className='text-center bg-blue-500 h-full'>
				<p>ping {data?.ping}</p>
			</div>
		</>
	);
};
export default Video;
