import React, { useEffect, useState } from 'react';
import { HiAnnotation, HiHome, HiVideoCamera } from 'react-icons/hi';
import { IMenuItem } from './types/MenuItems';
import { IEncryptionData, IFramingData, IVideoData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from './components/containers/CardList';
import Navigation from './components/navigation/Navigation';
import axios from 'axios';
import Video from './components/containers/Video';

const menuItems: IMenuItem[] = [
	{
		id: 0,
		title: 'nav1',
		link: 'link',
		icon: <HiAnnotation />
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
	const [videoData, setVideoData] = useState<IVideoData>();
	const [framingData, setFramingData] = useState<IFramingData>();
	const [encryptionData, setEncryptionData] = useState<IEncryptionData>();

	useEffect(() => {
		axios.get('http://localhost:4000/video').then((res) => setVideoData(res.data));
		axios.get('http://localhost:4000/framing').then((res) => setFramingData(res.data));
		axios.get('http://localhost:4000/encryption').then((res) => setEncryptionData(res.data));
	}, []);

	return (
		<Router>
			<Switch>
				<Route path='/video'>
					<Video data={videoData} />
				</Route>

				<Route path='/framing'>
					<div>
						<h2>Framing data</h2>
					</div>
				</Route>

				<Route path='/encryption'>
					<div>
						<h2>Encryption data</h2>
					</div>
				</Route>

				<Route path='/'>
					<CardList videoData={videoData} framingData={framingData} encryptionData={encryptionData} />
				</Route>
			</Switch>
			<Navigation menuItems={menuItems} />
		</Router>
	);
};
export default App;
