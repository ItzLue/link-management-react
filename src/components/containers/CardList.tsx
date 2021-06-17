import React from 'react';
import { Link } from 'react-router-dom';
import { IEncryptionData, IFramingData, IVideoData } from '../../types/api/data';
import { HiLockClosed, HiLockOpen, HiRefresh } from 'react-icons/all';

type data = {
	title: string;
	path: string;
};

const cardData: data[] = [
	{ title: 'Video', path: 'video' },
	{ title: 'Framing', path: 'framing' },
	{ title: 'Encryption', path: '' }
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
		<div className='rounded-2xl border border-gray-100 shadow-md h-48 max-h-48 relative'>
			<h2 className='font-medium text-lg text-center'>{title}</h2>
			{title === 'Video' && generateVideoCardData(videoData)}
			{title === 'Framing' && generateFramingCardData(framingData)}
			{title === 'Encryption' && generateEncryptionCardData(encryptionData)}
			<div className='flex flex-col absolute bottom-0 w-full'>
				<hr className='border-gray-100 w-full' />
				<div className='px-4 inline-flex items-center text-gray-500'>
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
			<div className='grid grid-rows-1 gap-8 md:grid-flow-col md:px-8 md:gap-4 my-16'>
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
		<div className='px-4'>
			<p>Ping: {data?.ping}</p>
			<p>Bitrate: {data?.bitrate}</p>
			<p>Proctol: {data?.protocol}</p>
			<p>Protocol Version: {data?.protocol_version}</p>
		</div>
	);
};

const generateFramingCardData = (data: IFramingData | undefined) => {
	return (
		<div className='px-4'>
			<p>Errors detected: {data?.errors_detected}</p>
			<p>Errors corrected: {data?.errors_corrected}</p>
		</div>
	);
};

const generateEncryptionCardData = (data: IEncryptionData | undefined) => {
	const iconClassName = 'w-full h-14';
	return (
		<div className='items-center text-center w-full h-full'>
			{data?.encrypted ? <HiLockClosed className={`${iconClassName} text-green-400`} /> : <HiLockOpen className={`${iconClassName} text-red-400`} />}
			<p>{`Type: ${data?.type ? data.type : ''}`}</p>
		</div>
	);
};
