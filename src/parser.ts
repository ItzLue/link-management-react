import { IAllRawResponse, IAllParsedResponse } from './types/api/data';
import { allRawResponse } from './data/data';
import dayjs from 'dayjs';

export const parseAllRawResponse = (response: IAllRawResponse): IAllParsedResponse[] =>
	Object.keys(response).map((timestamp) => ({
		simulationTimestamp: dayjs(timestamp).format('DD-MM-YYYY [ ] HH:mm'),
		transmissions: Object.keys(response[timestamp]).map((trans: string) => ({
			...response[timestamp][trans],
			transmissionTimestamp: trans
		}))
	}));

const parsed = parseAllRawResponse(allRawResponse);

console.log('Simulations: -------------- ');

console.log(parsed);

console.log('All transmissions: -------------- ');

console.log(parsed.map((sim) => console.log(sim)));

console.log('---------------');
