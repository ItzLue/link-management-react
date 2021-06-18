import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { IFramingData, IParsedTransmission } from '../../types/api/data';
import dayjs from 'dayjs';

type IProps = { transmissionData: IParsedTransmission[] };

export const EncryptionChart: React.FC<IProps> = ({ transmissionData }) => {
	const data = {
		labels: transmissionData.map((d) => dayjs(d.transmissionTimestamp).format('HH:mm:ss')),
		datasets: [
			{
				label: 'Encrypted',
				data: transmissionData.map((d) => d.encryption.encrypted),
				backgroundColor: 'rgb(26,214,220)'
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

	return <Bar data={data} options={options} type='bar' />;
};

export const FramingDoughnutChart: React.FC<IProps> = ({ transmissionData }) => {
	const data = {
		labels: ['Corrected errors', 'Detected errors'],
		datasets: [
			{
				label: 'Corrected errors',
				data: [1, 2],
				backgroundColor: 'rgb(26,214,220)'
			}
		]
	};
	return <></>;
};
