import React from 'react';
import { IVideoData } from '../../types/api/data';

type IProps = {
	videoData: IVideoData[];
};
const VideoChart: React.FC<IProps> = ({ videoData }) => {
	const data = {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				label: '# of Votes',
				data: [1, 2, 3, 4],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)'
			}
		]
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	};

	return <></>;
};

export default VideoChart;
