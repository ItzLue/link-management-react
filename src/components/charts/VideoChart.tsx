import React, { useState, useEffect } from 'react';
import { IVideoData } from '../../types/api/data';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

type IProps = { videoData: IVideoData[] };

const VideoChart: React.FC<IProps> = ({ videoData }) => {
	const [labels, setLabels] = useState<string[]>([]);

	const makeDateData = () => {
		setInterval(() => {
			const date = dayjs(Date.now()).format('HH:mm:ss').toString();
			setLabels([...labels, date]);
		}, 10000);
	};

	useEffect(() => {
		makeDateData();
	}, [labels, setLabels]);

	const data = {
		labels: labels,
		datasets: [
			{
				label: '# of Votes',
				data: videoData.map((d) => d.bitrate),
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

	return <Line options={options} data={data} type='line' />;
};

export default VideoChart;
