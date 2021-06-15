import React from 'react';
import { IMenuItem } from '../../types/MenuItems';
import { Link } from 'react-router-dom';

type IProps = { menuItems: IMenuItem[] };

const Navigation: React.FC<IProps> = ({ menuItems }) => {
	return (
		<nav className='w-full fixed bottom-0 h-20 shadow-md border border-gray-100 z-10 bg-white'>
			<div className='justify-between place-content-center flex flex-row h-full items-center px-12'>
				{menuItems.map((item, key) => (
					<Link to={item.link} key={key}>
						<div className='flex flex-col items-center'>
							<span>{item.icon}</span>
							<p className='uppercase tracking-widest'>{item.title}</p>
						</div>
					</Link>
				))}
			</div>
		</nav>
	);
};
export default Navigation;
