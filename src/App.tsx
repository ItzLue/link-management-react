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
	const [videoData, setVideoData] = useState<IVideoData[]>([]);
	const [framingData, setFramingData] = useState<IFramingData[]>([]);
	const [encryptionData, setEncryptionData] = useState<IEncryptionData[]>([]);

	const getData = () => {
		axios.get('http://localhost:4000/video').then((res) => setVideoData([...videoData, res.data]));
		axios.get('http://localhost:4000/framing').then((res) => setFramingData([...framingData, res.data]));
		axios.get('http://localhost:4000/encryption').then((res) => setEncryptionData([...encryptionData, res.data]));
	};

	useEffect(() => {
		getData();
		const interval = setInterval(() => {
			getData();
		}, 10000);
		return () => clearInterval(interval);
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
					<History data={videoData} />
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
