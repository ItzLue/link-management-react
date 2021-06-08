import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {IFramingData} from "../../types/api/data";
import dayjs from "dayjs";

type IProps = { framingData: IFramingData[] };

const FramingChart: React.FC<IProps> = ({framingData }) => {

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
        labels,
        datasets: [
            {
                label: 'Eroors detected',
                data: framingData.map((d) => d.errorsDetected),
                backgroundColor: 'rgb(246,75,95)',
            },
            {
                label: 'Errors corrected',
                data: framingData.map((d) => d.errorsCorrected),
                backgroundColor: 'rgb(26,214,220)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    };


    return <Bar data={data} options={options} type='bar'/>
};

export default FramingChart;