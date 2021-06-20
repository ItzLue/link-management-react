import React from 'react';
import { IParsedTransmission } from '../../types/api/data';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

type IProps = { transmissionData: IParsedTransmission[] };

const VideoChart: React.FC<IProps> = ({ transmissionData }) => {
	const dataBitrate = {
		labels: transmissionData.map((d) =>dayjs(d.transmissionTimestamp).format('HH:mm:ss')),
		datasets: [
			{
				label: 'Bitrate',
				data: transmissionData.map((d) => d.video.bitrate),
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)'
			}
		]
	};

	const dataPing = {
		labels: transmissionData.map((d) => dayjs(d.transmissionTimestamp).format('HH:mm:ss')),
		datasets: [
			{
				label: 'Ping',
				data: transmissionData.map((d) => d.video.ping),
				backgroundColor: 'rgb(54,232,196)'
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
