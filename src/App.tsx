import React, { useEffect, useState } from 'react';
import { HiVideoCamera } from 'react-icons/hi';
import Navigation from './components/navigation/Navigation';
import { IMenuItem } from './types/MenuItems';
import { IVideoData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CardList from './components/containers/CardList';
import { SingleCard } from './components/containers/SingleCard';

const menuItems: IMenuItem[] = [
	{
		id: 0,
		title: 'nav1',
		link: 'link',
		icon: <HiVideoCamera />
	},
	{
		id: 1,
		title: 'nav2',
		link: 'link',
		icon: <HiVideoCamera />
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

	return (
		<Router>
			<Route
				render={({ location }) => (
					<AnimatePresence exitBeforeEnter initial={false}>
						<Switch location={location} key={location.pathname}>
							<Route exact path='/' component={CardList} />
							<Route exact path='/:path' component={SingleCard} />
						</Switch>
					</AnimatePresence>
				)}
			/>
		</Router>
	);
};
export default App;
