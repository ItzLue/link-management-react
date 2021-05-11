import React from 'react';
import { IVideoData } from '../../types/api/data';

type IProps = {
	videoData: IVideoData;
};
const VideoChart: React.FC<IProps> = ({ videoData }) => {
	const data = {
		labels: [],
		datasets: {
			data: [videoData.bitrate]
		}
	};
	return <div></div>;
};

export default VideoChart;
