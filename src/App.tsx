import React, { useEffect, useState } from 'react';
import { HiHome, HiVideoCamera } from 'react-icons/hi';
import { IMenuItem } from './types/MenuItems';
import { IEncryptionData, IFramingData, IVideoData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from './components/containers/CardList';
import Navigation from './components/navigation/Navigation';
import axios from 'axios';
import Video from './components/containers/Video';
import History from './components/containers/History';
import { FaHistory } from 'react-icons/fa';
import Encryption from './components/containers/Encryption';
import Framing from './components/containers/Framing';

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
		title: 'nav3',
		link: 'link',
		icon: <HiVideoCamera />
	}
];

const App: React.FC = () => {
	const INTERVAL = 10000; // in milliseconds
	const MAX_LENGTH = 30;
	const [videoData, setVideoData] = useState<IVideoData[]>([]);
	const [framingData, setFramingData] = useState<IFramingData[]>([]);
	const [encryptionData, setEncryptionData] = useState<IEncryptionData[]>([]);

	async function pollData<T>(acc: any[], setter: any, endpointURL: string): Promise<void> {
		const response = await axios.get<T>(endpointURL);
		if (acc.length === MAX_LENGTH) acc.shift();
		const newData = [...acc, response.data];
		setter(newData);
		setTimeout(() => pollData(newData, setter, endpointURL), INTERVAL);
	}

	useEffect(() => {
		pollData(videoData, setVideoData, 'http://localhost:4000/video');
		pollData(framingData, setFramingData, 'http://localhost:4000/framing');
		pollData(encryptionData, setEncryptionData, 'http://localhost:4000/encryption');
	}, []);

	return (
		<Router>
			<Switch>
				<Route path='/video'>
					<Video data={videoData} />
				</Route>

				<Route path='/framing'>
					<Framing data={framingData} />
				</Route>

				<Route path='/encryption'>
					<Encryption data={encryptionData} />
				</Route>

				<Route path='/history'>
					<History videoData={videoData} framingData={framingData} encryptionData={encryptionData} />
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
