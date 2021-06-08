import React, { useState, useEffect } from 'react';
import { IFramingData } from '../../types/api/data';
import { Doughnut } from 'react-chartjs-2';

type IProps = { framingData: IFramingData[] };

const FramingChart: React.FC<IProps> = ({framingData }) => {

    const data = {
        labels: ['Errors corrected', 'Errors detected'],
        datasets: [
            {
                label: 'Errors detected',
                data: [framingData[0].errorsCorrected,framingData[0].errorsDetected],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut type='doughnut' data={data}/>
};

export default FramingChart;