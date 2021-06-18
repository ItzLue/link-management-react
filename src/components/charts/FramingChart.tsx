import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { IFramingData, IParsedTransmission } from '../../types/api/data';
import dayjs from 'dayjs';

type IProps = { transmissionData: IParsedTransmission[] };

export const FramingChartStackBar: React.FC<IProps> = ({ transmissionData }) => {
	const data = {
		labels: transmissionData.map((d) => dayjs(d.transmissionTimestamp).format('HH:mm:ss')),
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

export const FramingDoughnutChart: React.FC<IProps> = ({ transmissionData }) => {
	const data = {
		labels: ['Corrected errors', 'Detected errors'],
		datasets: [
			{
				label: 'Corrected errors',
				data: [transmissionData[transmissionData.length - 1].framing.errors_corrected, transmissionData[transmissionData.length - 1].framing.errors_detected],
				backgroundColor: ['rgb(255,0,0)', 'rgb(0,255,0)']
			}
		]
	};
	return <Doughnut data={data} style={{ width: '50%', height: '50%' }} type='doughnut' />;
};
