import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { IFramingData, IParsedTransmission } from '../../types/api/data';
import dayjs from 'dayjs';

type IProps = { transmissionData: IParsedTransmission[] };

const FramingChart: React.FC<IProps> = ({ transmissionData }) => {
	const data = {
		labels: transmissionData.map((d) => d.transmissionTimestamp),
		datasets: [
			{
				label: 'Corrected errors',
				data: transmissionData.map((d) => d.framing.errors_corrected),
				backgroundColor: 'rgb(26,214,220)'
			},
			{
				label: 'Detected errors',
				data: transmissionData.map((d) => d.framing.errors_detected),
				backgroundColor: 'rgb(255,0,0)'
			}
		]
	};

	const options = {
		scales: {
			yAxes: [
				{
					stacked: true,
					ticks: {
						beginAtZero: true
					}
				}
			],
			xAxes: [
				{
					stacked: true
				}
			]
		}
	};

	return <Bar data={data} options={options} type='bar' />;
};

export default FramingChart;
