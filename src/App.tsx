import React, { useEffect, useState } from 'react';
import { IAllParsedResponse, IHash, IParsedTransmission, ITransmissionData } from './types/api/data';
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
import { set } from 'idb-keyval';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant='filled' {...props} />;

const App: React.FC = () => {
	const INTERVAL = 10000; // in milliseconds
	const [allData, setAllData] = useState<IAllParsedResponse[]>();
	const [currentTransmission, setCurrentTransmission] = useState<IParsedTransmission>();
	const [showConnectionError, setShowConnectionError] = useState(false);
	const [showSim, setShowSim] = useState(false);
	const [showSimIsRunning, setShowSimIsRunning] = useState(false);
	const [isSimRunning, setIsSimRunning] = useState(false);
	const [isRealTransmission, setIsRealTransmission] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showChangesApplied, setShowChangesApplied] = useState(false);
	const [showAlreadyRunniing, setIsSimAlreadyRunning] = useState(false);
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
				setShowSimIsRunning(true);
				setIsSimRunning(true);
			})
			.catch(() => {
				setShowSimIsRunning(false);
				setIsSimRunning(false);
			});
		setTimeout(() => fetchCurrentTransmission(), INTERVAL);
	};

	const confirmPackage = (hashes: IHash) => {
		setTimeout(() => console.log(), 2000);
		const hash1 = backend.get('confirm_package', { params: { hash: hashes[0] } });
		const hash2 = backend.get('confirm_package', { params: { hash: hashes[1] } });
		const hash3 = backend.get('confirm_package', { params: { hash: hashes[2] } });
		const hash4 = backend.get('confirm_package', { params: { hash: hashes[3] } });

		Promise.all([hash1, hash2, hash3, hash4]).then((r) => {
			r.map((t) => {
				if (t.data === true) return;
				else setTimeout(() => confirmPackage(hashes), 1500);
			});
		});
	};

	const fetchAllData = () =>
		backend.get('all').then((r) => {
			const parsed = parseAllRawResponse(r.data);
			setAllData(parsed.reverse());
			parsed.map((s) => {
				set(s.simulationTimestamp, s.transmissions);
			});
		});

	const onSubmit = async (data: ISettingsForm) => {
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
				.then(() => {
					setShowChangesApplied(true);
				})
				.catch(() => console.log('Failed to post'));
		} else {
			backend
				.post('change/after', object)
				.then((r) => {
					const hashes: string[] = r.data;
					confirmPackage(hashes);
					setShowChangesApplied(true);
				})
				.catch(() => console.log('Failed to post'));
		}
	};

	const onStartSimulation = () =>
		backend
			.get('current', { params: { start: true } })
			.then(() => setShowSimIsRunning(true))
			.catch(() => setIsSimAlreadyRunning(true));

	const onStopSimulation = () => {
		setShowSimIsRunning(false);
		backend
			.get('current', { params: { stop: true } })
			.then(() => {
				fetchAllData().then(() => console.log('New data fetched'));
				setShowStopSim(true);
			})
			.catch(() => setShowError(true));
	};

	useEffect(() => {
		fetchAllData().catch(() => setShowConnectionError(true));
		fetchCurrentTransmission();
	}, []);

	return (
		<Router>
			<Snackbar open={showConnectionError} onClose={() => setShowConnectionError(false)} autoHideDuration={10000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='error'>No connection to the server!</Alert>
			</Snackbar>
			<Snackbar open={showSimIsRunning} onClose={() => setShowSimIsRunning(false)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='info'>Simulation is running</Alert>
			</Snackbar>
			<Snackbar open={showStopSim} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='success'>Simulation saved</Alert>
			</Snackbar>
			<Snackbar open={showError} onClose={() => setShowError(false)} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='error'>Something went wrong, try again</Alert>
			</Snackbar>
			<Snackbar open={showStopSim} onClose={() => setShowStopSim(false)} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='success'>Simulation saved</Alert>
			</Snackbar>
			<Snackbar open={showChangesApplied} onClose={() => setShowChangesApplied(false)} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert severity='success'>Settings saved</Alert>
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
					{showSim && <SimulationControl isRunning={showSimIsRunning} onStartCallback={onStartSimulation} onStopCallback={onStopSimulation} />}
				</Route>
			</Switch>
			<Navigation isSimStarted={showSim} isRealTransmission={isRealTransmission} onToggle={() => setShowSim(!showSim)} />
		</Router>
	);
};
export default App;
