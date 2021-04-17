import React from 'react';
import { IMenuItem } from '../../types/MenuItems';

type IProps = { menuItems: IMenuItem[] };

const Navigation: React.FC<IProps> = ({ menuItems }) => {
	return (
		<div className='w-full fixed bottom-0 h-12 shadow-md border border-gray-100'>
			<div className='justify-between place-content-center flex flex-row h-full items-center px-12'>
				{menuItems.map((item, key) => (
					<div key={key} className='flex flex-col items-center'>
						<a>{item.icon}</a>
						<p>{item.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default Navigation;
