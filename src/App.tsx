import React, { useEffect, useState } from 'react';
import { HiVideoCamera } from 'react-icons/hi';
import Navigation from './components/navigation/Navigation';
import { IMenuItem } from './types/MenuItems';
import DataCard from './components/containers/DataCard';

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
	const data: string[] = ['title1', 'title2', 'title3'];

	return (
		<div className='place-content-center'>
			{data.map((item, key) => (
				<DataCard title={item} key={key} />
			))}
		</div>
	);
};
export default App;
