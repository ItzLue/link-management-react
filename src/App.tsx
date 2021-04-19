import React, { useEffect, useState } from 'react';
import { HiVideoCamera } from 'react-icons/hi';
import Navigation from './components/navigation/Navigation';
import { IMenuItem } from './types/MenuItems';
import DataCard from './components/containers/DataCard';
import { IVideoData } from './types/api/data';

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
		<div className='place-content-center'>
			<DataCard title='Title1'></DataCard>
			<Navigation menuItems={menuItems} />
		</div>
	);
};
export default App;
