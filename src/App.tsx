import React, { useEffect, useState } from 'react';
import { IAllParsedResponse, IParsedTransmission, ITransmissionData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from './components/containers/CardList';
import Navigation from './components/navigation/Navigation';
import History from './components/containers/History';
import Settings from './components/containers/Settings';
import { backend } from './api';
import SimulationControl from './components/containers/SimulationControl';
import { parseAllRawResponse } from './parser';
import dayjs from 'dayjs';
import { ISettingsForm } from './types/settings-form';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant='filled' {...props} />;

const App: React.FC = () => {
	const INTERVAL = 10000; // in milliseconds
	const [allData, setAllData] = useState<IAllParsedResponse[]>();
	const [currentTransmission, setCurrentTransmission] = useState<IParsedTransmission>();
	const [errorStatusCode, setErrorStatusCode] = useState<number>(-1);
	const [showSim, setShowSim] = useState(false);
	const [isSimRunning, setIsSimRunning] = useState(false);
	const [isRealTransmission, setIsRealTransmission] = useState(false);
	const [isSimAlreadyRunning, setIsSimAlreadyRunning] = useState(false);
	const [showStopSim, setShowStopSim] = useState(false);

	const fetchCurrentTransmission = () => {
		backend
			.get<ITransmissionData>('current')
			.then((r) => {
				setCurrentTransmission({
					transmissionTimestamp: dayjs(Date.now()).format('HH:mm:ss'),
					link: r.data.link,
					encryption: r.data.encryption,
					framing: r.data.framing,
					video: r.data.video
				});
			})
			.catch(() => {
				setErrorStatusCode(406);
				setIsSimRunning(false)
			});
		setTimeout(() => fetchCurrentTransmission(), INTERVAL);
	};

	const confirmPackage = (hash: string) => {
		backend.get('confirm_package', { params: { hash: hash } }).then((r) => {
			if (r.data === true) return;
			else setTimeout(() => confirmPackage(hash), 1500);
		});
	};

	const fetchAllData = () => backend.get('all').then((r) => setAllData(parseAllRawResponse(r.data).reverse()));

	const onSubmit = (data: ISettingsForm) => {
		const object = {
			video: {
				bitrate: Number(data.video_bit_rate),
				max_package_size: Number(data.video_max_package_size),
				min_package_size: Number(data.video_min_package_size),
				ping: Number(data.video_ping),
				protocol: data.video_protocol,
				protocol_version: data.video_protocol_version
			},
			encryption: {
				process_time: Number(data.encryption_process_time),
				type: data.encryption_type,
				encrypted: Number(data.encryption_encrypted)
			},
			framing: {
				error_corr_rate: Number(data.framing_error_corr_rate),
				error_det_rate: Number(data.framing_error_det_rate),
				process_time: Number(data.framing_process_time),
				errors_detected: 0,
				errors_corrected: 0,
				bit_change_rate: Number(data.framing_bit_change_rate),
				bits_changed: 0
			},
			link: {
				video_delay: Number(data.link_video_delay),
				video_bitrate: Number(data.video_bit_rate),
				process_time: Number(data.link_process_time),
				framing_errors_corrected: 0,
				framing_errors_detected: 0,
				video_packets_received: 0
			}
		};

		if (!isSimRunning) {
			backend
				.post('change/before', object)
				.then(() => setIsSimRunning(true))
				.catch(() => console.log('Failed to post'));
		} else {
			backend
				.post('change/after', object)
				.then((r) => {
					const hash = r.data;
					confirmPackage(hash);
					setIsSimRunning(true);
				})
				.catch(() => console.log('Failed to post'));
		}
	};

	const onStartSimulation = () =>
		backend
			.get('current', { params: { start: true } })
			.then(() => setIsSimRunning(true))
			.catch(() => setIsSimAlreadyRunning(true));

	const onStopSimulation = () =>
		backend.get('current', { params: { stop: true } }).then(() => {
			setIsSimRunning(false);
			setShowStopSim(true);
			fetchAllData().then(() => console.log('New data fetched'));
		});

	useEffect(() => {
		fetchAllData().catch((r) => {
			setErrorStatusCode(r.status);
			console.log(r);
		});
			fetchCurrentTransmission();
	}, []);

	return (
		<Router>
			{errorStatusCode >= 400 && (
				<Snackbar open={errorStatusCode >= 400} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
					<Alert severity='error'>No connection to the server!</Alert>
				</Snackbar>
			)}
			<Snackbar open={isSimRunning} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='info'>Simulation is running</Alert>
			</Snackbar>
			<Snackbar open={isSimAlreadyRunning} onClose={() => setIsSimAlreadyRunning(false)} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='error'>Something went wrong try again</Alert>
			</Snackbar>
			<Snackbar open={showStopSim} onClose={() => setShowStopSim(false)} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='success'>Simulation saved</Alert>
			</Snackbar>
			<Switch>
				<Route path='/history'>
					<History data={allData ?? []} />
				</Route>
				<Route path='/settings'>
					<Settings defaultValues={currentTransmission} onSubmit={onSubmit} />
				</Route>
				<Route path='/'>
					<CardList currentTransmission={currentTransmission} />
					{showSim && <SimulationControl isRunning={isSimRunning} onStartCallback={onStartSimulation} onStopCallback={onStopSimulation} />}
				</Route>
			</Switch>
			<Navigation isSimStarted={showSim} isRealTransmission={isRealTransmission} onToggle={() => setShowSim(!showSim)} />
		</Router>
	);
};
export default App;
