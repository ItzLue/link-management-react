import { IAllRawResponse, IAllParsedResponse } from './types/api/data';
import dayjs from 'dayjs';

export const parseAllRawResponse = (response: IAllRawResponse): IAllParsedResponse[] =>
	Object.keys(response).map((timestamp) => ({
		simulationTimestamp: dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss'),
		transmissions: Object.keys(response[timestamp]).map((trans: string) => ({
			...response[timestamp][trans],
			transmissionTimestamp: trans
		}))
	}));
