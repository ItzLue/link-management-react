import React, { useEffect, useState } from 'react';
import { HiAdjustments, HiHome } from 'react-icons/hi';
import { IMenuItem } from './types/MenuItems';
import { IEncryptionData, IFramingData, IReadAllData, IVideoData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from './components/containers/CardList';
import Navigation from './components/navigation/Navigation';
import Video from './components/containers/Video';
import History from './components/containers/History';
import { FaHistory } from 'react-icons/fa';
import Framing from './components/containers/Framing';
import Settings from './components/containers/Settings';
import { backend } from './api';
import ErrorMessage from './components/containers/ErrorMessage';
import { set } from 'idb-keyval';
import axios from 'axios';

const menuItems: IMenuItem[] = [
	{
		id: 0,
		title: 'History',
		link: '/history',
		icon: <FaHistory />
	},
	{
		id: 1,
		title: 'Home',
		link: '/',
		icon: <HiHome />
	},
	{
		id: 2,
		title: 'Settings',
		link: '/settings',
		icon: <HiAdjustments />
	}
];

const App: React.FC = () => {
	const INTERVAL = 10000; // in milliseconds
	const MAX_LENGTH = 30;
	const [videoData, setVideoData] = useState<IVideoData[]>([]);
	const [framingData, setFramingData] = useState<IFramingData[]>([]);
	const [encryptionData, setEncryptionData] = useState<IEncryptionData[]>([]);
	const [allData, setAllData] = useState<IReadAllData[]>();
	const [errorStatusCode, setErrorStatusCode] = useState<number>(-1);

	async function pollData<T>(acc: any[], setter: any, endpoint: string): Promise<void> {
		const response = await backend.get<T>(endpoint);
		if (acc.length === MAX_LENGTH) acc.shift();
		const newData = [...acc, response?.data];
		setter(newData);
		if (response.status === 200) await set(endpoint, newData);
		setTimeout(() => pollData(newData, setter, endpoint), INTERVAL);
	}

	useEffect(() => {
		backend.get('http://localhost:4000/test').then((r) => console.log(r));
		pollData(videoData, setVideoData, 'video').catch((error) => (error.status ? setErrorStatusCode(error.status) : setErrorStatusCode(600)));
		pollData(framingData, setFramingData, 'framing').catch(() => console.log('Could not connect to server'));
		pollData(encryptionData, setEncryptionData, 'encryption').catch(() => console.log('Could not connect to server'));
	}, []);

	const onSubmit = (data: unknown) => {
		console.log(data);
		axios
			.post('http://localhost:4000/settings', data)
			.then(() => console.log('Form data posted'))
			.catch(() => console.log('Failed to post'));
	};

	return (
		<Router>
			{errorStatusCode >= 400 && <ErrorMessage />}
			<Switch>
				<Route path='/video'>
					<Video data={videoData} />
				</Route>
				<Route path='/framing'>
					<Framing data={framingData} />
				</Route>
				iconClassName
				<Route path='/history'>
					<History
						data={[
							{
								link: [
									{
										framing_errors_detected: 0,
										framing_errors_corrected: 0,
										video_delay: 0,
										video_packets_received: 0
									}
								],
								video: [{ protocol_Version: 'ee', packets_recevied: 1, protocol: 'ew', delay: 0 }],
								framing: [{ errors_detected: 1, errors_corrected: 1 }],
								encryption: [{ isEnabled: true, type: 'ew' }]
							},
							{
								link: [
									{
										framing_errors_detected: 0,
										framing_errors_corrected: 0,
										video_delay: 0,
										video_packets_received: 0
									}
								],
								video: [{ protocol_Version: 'ee', packets_recevied: 1, protocol: 'ew', delay: 0 }],
								framing: [{ errors_detected: 1, errors_corrected: 1 }],
								encryption: [{ isEnabled: true, type: 'ew' }]
							},
							{
								link: [
									{
										framing_errors_detected: 0,
										framing_errors_corrected: 0,
										video_delay: 0,
										video_packets_received: 0
									}
								],
								video: [{ protocol_Version: 'ee', packets_recevied: 1, protocol: 'ew', delay: 0 }],
								framing: [{ errors_detected: 1, errors_corrected: 1 }],
								encryption: [{ isEnabled: true, type: 'ew' }]
							}
						]}
					/>
				</Route>
				<Route path='/settings'>
					<Settings onSubmit={onSubmit} />
				</Route>
				<Route path='/'>
					<CardList videoData={videoData[videoData.length - 1]} framingData={framingData[framingData.length - 1]} encryptionData={encryptionData[encryptionData.length - 1]} />
				</Route>
			</Switch>
			<Navigation menuItems={menuItems} />
		</Router>
	);
};
export default App;
