import React, { useEffect, useState } from 'react';
import { IAllParsedResponse, IEncryptionData, IFramingData, IParsedTransmission, ITransmissionData, IVideoData } from './types/api/data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardList from './components/containers/CardList';
import Navigation from './components/navigation/Navigation';
import Video from './components/containers/Video';
import History from './components/containers/History';
import Framing from './components/containers/Framing';
import Settings from './components/containers/Settings';
import { backend } from './api';
import { set } from 'idb-keyval';
import SimulationControl from './components/containers/SimulationControl';
import { parseAllRawResponse } from './parser';
import dayjs from 'dayjs';
import { ISettingsForm } from './types/settings-form';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant='filled' {...props} />;

const App: React.FC = () => {
	const INTERVAL = 10000; // in milliseconds
	const MAX_LENGTH = 5;
	const [videoData, setVideoData] = useState<IVideoData>();
	const [framingData, setFramingData] = useState<IFramingData>();
	const [encryptionData, setEncryptionData] = useState<IEncryptionData>();
	const [allData, setAllData] = useState<IAllParsedResponse[]>();
	const [currentTransmission, setCurrentTransmission] = useState<IParsedTransmission[]>([]);
	const [errorStatusCode, setErrorStatusCode] = useState<number>(-1);
	const [showSim, setShowSim] = useState(false);
	const [isSimRunning, setIsSimRunning] = useState(false);
	const [isRealTransmission, setIsRealTransmission] = useState(false);

	async function pollData<T>(acc: any[], setter: any, endpoint: string): Promise<void> {
		const response = await backend.get<T>(endpoint);
		if (acc.length === MAX_LENGTH) acc.shift();
		const newData = [...acc, response?.data];
		setter(newData);
		if (response.status === 200) await set(endpoint, newData);
		setTimeout(() => pollData(newData, setter, endpoint), INTERVAL);
	}

	const fetchCurrentTransmission = () => {
		backend
			.get<ITransmissionData>('current')
			.then((r) => {
				setVideoData(r.data.video);
				setFramingData(r.data.framing);
				setEncryptionData(r.data.encryption);
				setErrorStatusCode(r.status);
				if (currentTransmission?.length === MAX_LENGTH) currentTransmission.shift();
				setCurrentTransmission([
					...currentTransmission,
					{
						transmissionTimestamp: dayjs(Date.now()).format('HH:mm'),
						link: r.data.link,
						encryption: r.data.encryption,
						framing: r.data.framing,
						video: r.data.video
					}
				]);
			})
			.catch(() => setErrorStatusCode(404));
		setTimeout(() => fetchCurrentTransmission(), INTERVAL);
	};

	const confirmPackage = (hash: string) => {
		backend.get('confirm_package', { params: { hash: hash } }).then((r) => {
			if (r.data === true) return;
			else {
				setTimeout(() => confirmPackage(hash), 1500);
			}
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
				errors_detected: 1,
				errors_corrected: 1
			},
			link: {
				video_delay: Number(data.link_video_delay),
				video_bitrate: Number(data.video_bit_rate),
				process_time: Number(data.link_process_time),
				framing_errors_corrected: 1,
				framing_errors_detected: 1,
				video_packets_received: 1
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

	const onStartSimulation = () => backend.get('current', { params: { start: true } }).then(() => setIsSimRunning(true));

	const onStopSimulation = () => backend.get('current', { params: { stop: true } }).then(() => setIsSimRunning(false));

	useEffect(() => {
		fetchAllData().catch((r) => setErrorStatusCode(r.status));
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
			<Switch>
				<Route path='/video'>
					<Video data={currentTransmission} />
				</Route>
				<Route path='/framing'>
					<Framing data={currentTransmission} />
				</Route>
				<Route path='/history'>
					<History data={allData ?? []} />
				</Route>
				<Route path='/settings'>
					<Settings defaultValues={currentTransmission[currentTransmission.length - 1]} onSubmit={onSubmit} />
				</Route>
				<Route path='/'>
					<CardList videoData={videoData} framingData={framingData} encryptionData={encryptionData} />
					{showSim && <SimulationControl isRunning={isSimRunning} onStartCallback={onStartSimulation} onStopCallback={onStopSimulation} />}
				</Route>
			</Switch>
			<Navigation isSimStarted={showSim} isRealTransmission={isRealTransmission} onToggle={() => setShowSim(!showSim)} />
		</Router>
	);
};
export default App;
