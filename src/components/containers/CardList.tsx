import React from 'react';
import { Link } from 'react-router-dom';
import { IEncryptionData, IFramingData, IVideoData } from '../../types/api/data';
import { HiLockClosed, HiLockOpen, HiRefresh } from 'react-icons/all';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
	initial: { scale: 0.9, opacity: 0 },
	enter: { scale: 1, opacity: 1, transition },
	exit: {
		scale: 0.5,
		opacity: 0,
		transition: { duration: 1.5 }
	}
};

type data = {
	title: string;
	path: string;
};

const cardData: data[] = [
	{ title: 'Video', path: 'video' },
	{ title: 'Framing', path: 'framing' },
	{ title: 'Encryption', path: 'encryption' }
];

type ICardProps = {
	title: string;
	path: string;
	videoData?: IVideoData;
	framingData?: IFramingData;
	encryptionData?: IEncryptionData;
};

const Card: React.FC<ICardProps> = ({ title, path, videoData, framingData, encryptionData }) => (
	<Link to={path}>
		<div className='rounded-2xl border border-gray-100 shadow-md h-48 max-h-48 md:p-8 relative'>
			<h2 className='font-medium text-lg'>{title}</h2>
			{path === 'video' && generateVideoCardData(videoData)}
			{path === 'framing' && generateFramingCardData(framingData)}
			{path === 'encryption' && generateEncryptionCardData(encryptionData)}
			<div className='flex flex-col absolute bottom-0 m-2'>
				<hr className='border-gray-100 w-full' />
				<div className='inline-flex items-center text-gray-500'>
					<HiRefresh className='h-4 w-4 mr-2' />
					<p>Last updated: 5 min ago</p>
				</div>
			</div>
		</div>
	</Link>
);

type ICardListProps = {
	videoData?: IVideoData;
	framingData?: IFramingData;
	encryptionData?: IEncryptionData;
};
const CardList: React.FC<ICardListProps> = ({ videoData, framingData, encryptionData }) => {
	return (
		<>
			<div className='grid grid-rows-1 md:grid-flow-col px-8 gap-8 h-full mt-8 mb-16'>
				{cardData.map((card, key) => (
					<Card title={card.title} path={card.path} key={key} videoData={videoData} framingData={framingData} encryptionData={encryptionData} />
				))}
			</div>
		</>
	);
};
export default CardList;

const generateVideoCardData = (data: IVideoData | undefined) => {
	return (
		<div>
			<p>Ping: {data?.ping}</p>
			<p>Bitrate: {data?.bitrate}</p>
			<p>Proctol: {data?.protocol}</p>
			<p>Protocol Version: {data?.protocolVersion}</p>
		</div>
	);
};

const generateFramingCardData = (data: IFramingData | undefined) => {
	return (
		<div>
			<p>Errors detected {data?.errorsDetected}</p>
			<p>Errors corrected {data?.errorsCorrected}</p>
		</div>
	);
};

const generateEncryptionCardData = (data: IEncryptionData | undefined) => {
	const iconClassName = 'w-full h-14';
	return (
		<div className='items-center text-center w-full h-full'>
			{data?.isEnabled ? <HiLockClosed className={`${iconClassName} text-green-400`} /> : <HiLockOpen className={`${iconClassName} text-red-400`} />}
			<p>{`Type: ${data?.type}`}</p>
		</div>
	);
};
