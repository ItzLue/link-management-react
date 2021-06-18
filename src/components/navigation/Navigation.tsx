import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Chip } from '@material-ui/core';
import { HiAdjustments, HiHome } from 'react-icons/hi';
import { FaHistory } from 'react-icons/fa';
import Switch from '@material-ui/core/Switch';

type IProps = { onToggle: () => void; isSimStarted: boolean; isRealTransmission: boolean };
const Navigation: React.FC<IProps> = ({ onToggle, isSimStarted, isRealTransmission }) => {
	const [value, setValue] = useState('home');
	const history = useHistory();
	const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => setValue(newValue);

	useEffect(() => {
		if (!isSimStarted) {
			history.push('/');
			setValue('home');
		}
	}, [isSimStarted]);

	const toggle = () => (
		<div className='inline-flex items-center mb-2'>
			<label>Simulation</label>
			<Switch checked={isSimStarted} onClick={onToggle} />
		</div>
	);

	return (
		<BottomNavigation value={value} onChange={handleChange} className='w-full fixed bottom-0 border' style={{ height: '10vh' }}>
			<BottomNavigationAction label='History' value='history' component={Link} to='/history' icon={<FaHistory />} />
			<BottomNavigationAction label='Home' component={Link} to='/' value='home' icon={<HiHome />} />
			<BottomNavigationAction label='Settings' value='settings' component={Link} to='/settings' disabled={!isSimStarted} icon={<HiAdjustments />} />
			<BottomNavigationAction label='simulation' value='simulation' component={toggle} />
		</BottomNavigation>
	);
};
export default Navigation;
