import React from 'react';

type IProps = {
	isRunning: boolean;
	onStartCallback: () => void;
	onStopCallback: () => void;
};

const SimulationControl: React.FC<IProps> = ({ isRunning, onStartCallback, onStopCallback }) => {
	const styling = 'px-4 py-2 rounded-2xl';
	return (
		<div className='flex justify-between outline-none mb-20 mx-6 text-white'>
			<button className={`${styling} bg-blue-500 disabled:opacity-50`} onClick={onStartCallback}>
				Start simulation
			</button>
			<button className={`${styling} bg-red-500 disabled:opacity-50`} onClick={onStopCallback}>
				Stop simulation
			</button>
		</div>
	);
};

export default SimulationControl;
