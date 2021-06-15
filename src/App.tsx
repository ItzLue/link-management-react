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
import SimulationControl from './components/containers/SimulationControl';

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
	const [isSimulationRunning, setIsSimulationRunning] = useState(false);

	async function pollData<T>(acc: any[], setter: any, endpoint: string): Promise<void> {
		const response = await backend.get<T>(endpoint);
		if (acc.length === MAX_LENGTH) acc.shift();
		const newData = [...acc, response?.data];
		setter(newData);
		if (response.status === 200) await set(endpoint, newData);
		setTimeout(() => pollData(newData, setter, endpoint), INTERVAL);
	}

	useEffect(() => {
		// Get all
		backend.get('current').then((r) => {
			const array: any[] = [];
			Object.keys(r.data).forEach((key) => console.log(key));
		});
	}, []);

	const onSubmit = (data: unknown) => {
		backend
			.post('change', data)
			.then(() => console.log('Form data posted'))
			.catch(() => console.log('Failed to post'));
	};

	const onStartSimulation = () =>
		backend
			.get('current', { params: { start: true } })
			.then(() => setIsSimulationRunning(true))
			.catch(() => setIsSimulationRunning(false));
	const onStopSimulation = () => backend.get('current', { params: { stop: true } }).then(() => setIsSimulationRunning(false));

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
				<Route path='/history'></Route>
				<Route path='/settings'>
					<Settings onSubmit={onSubmit} />
				</Route>
				<Route path='/'>
					<CardList videoData={videoData[videoData.length - 1]} framingData={framingData[framingData.length - 1]} encryptionData={encryptionData[encryptionData.length - 1]} />
					<SimulationControl isRunning={isSimulationRunning} onStartCallback={onStartSimulation} onStopCallback={onStopSimulation} />
				</Route>
			</Switch>
			<Navigation menuItems={menuItems} />
		</Router>
	);
};
export default App;
