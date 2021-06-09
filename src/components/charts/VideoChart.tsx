import React, { useState, useEffect } from 'react';
import { IVideoData } from '../../types/api/data';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

type IProps = { videoData: IVideoData[] };

const VideoChart: React.FC<IProps> = ({ videoData }) => {
	const [labels, setLabels] = useState<string[]>([]);

	const makeTimeLabels = () => {
		setInterval(() => {
			const date = dayjs(Date.now()).format('HH:mm:ss').toString();
			setLabels([...labels, date]);
		}, 10000);
	};

	useEffect(() => makeTimeLabels(), [labels, setLabels]);

	const dataBitrate = {
		labels,
		datasets: [
			{
				label: 'Bitrate',
				data: videoData.map((d) => d.bitrate),
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)'
			}
		]
	};

	const dataPing = {
		labels: labels,
		datasets: [
			{
				label: 'Ping',
				data: videoData.map((d) => d.ping),
				fill: false,
				backgroundColor: 'rgb(54,232,196)',
				borderColor: 'rgba(76,250,193,0.2)'
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

	return (
		<>
			<Line options={options} data={dataBitrate} type='line' />
			<Line options={options} data={dataPing} type='line' />
		</>
	);
};

export default VideoChart;
