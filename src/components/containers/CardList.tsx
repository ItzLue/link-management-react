import React from 'react';
import { Link } from 'react-router-dom';
import { IEncryptionData, IFramingData, IVideoData } from '../../types/api/data';

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
		<div className='rounded-3xl border border-gray-100 text-center h-32 my-8'>
			<h2 className='font-medium text-lg'>{title}</h2>
			{path === 'video' && generateVideoCardData(videoData)}
			{path === 'framing' && generateFramingCardData(framingData)}
			{path === 'encryption' && generateEncryptionCardData(encryptionData)}
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
			<div className='p-8'>
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
	return (
		<div>
			<p>
				Encryption: <span className={`${data?.isEnabled ? 'text-green-800' : 'text-red-800'}`}>{data?.isEnabled ? 'enabled' : 'disabled'}</span>
			</p>
			<p>Type {data?.type}</p>
		</div>
	);
};
