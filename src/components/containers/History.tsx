import React from 'react';
import { Disclosure } from '@headlessui/react';
import { IAllParsedResponse, IEncryptionData, IFramingData, IParsedTransmission, IVideoData } from '../../types/api/data';
import { HiArrowNarrowDown } from 'react-icons/all';
import { FaHistory } from 'react-icons/fa';
import VideoChart from '../charts/VideoChart';

type IProps = { data: IAllParsedResponse[] };

const History: React.FC<IProps> = ({ data }) => {
	return (
		<div className='w-full px-4 py-16'>
			<h1 className='text-center text-2xl'>
				<FaHistory className='mr-2 inline' />
				Previous transmissions
			</h1>
			<div className='grid space-y-4'>{generatePanels(data)}</div>
		</div>
	);
};

export default History;

const generatePanels = (data: IAllParsedResponse[]) =>
	data.reverse().map((d, key) => (
		<Disclosure as='div' className='mt-4' key={key}>
			{({ open }) => (
				<>
					<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
						<span>{d.simulationTimestamp}</span>
						<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
					</Disclosure.Button>
					{generateVideoPanel(d.transmissions)}
					{generateFramingPanel(d.transmissions.map((t) => t.framing))}
					{generateEncryptionData(d.transmissions.map((t) => t.encryption))}
				</>
			)}
		</Disclosure>
	));

const generateVideoPanel = (videoData: IParsedTransmission[]) => (
	<Disclosure.Panel>
		<Disclosure as='div' className='mt-2'>
			{({ open }) => (
				<>
					<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
						<span>Video</span>
						<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
					</Disclosure.Button>
					<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
						<VideoChart transmissionData={videoData} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	</Disclosure.Panel>
);

const generateFramingPanel = (framingData: IFramingData[]) => (
	<Disclosure.Panel>
		<Disclosure as='div' className='mt-2'>
			{({ open }) => (
				<>
					<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
						<span>Framing</span>
						<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
					</Disclosure.Button>
					<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>Erros corrected</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	</Disclosure.Panel>
);

const generateEncryptionData = (encryptionData: IEncryptionData[]) => (
	<Disclosure.Panel>
		<Disclosure as='div' className='mt-2'>
			{({ open }) => (
				<>
					<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
						<span>Encryption</span>
						<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
					</Disclosure.Button>
					<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>Type</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	</Disclosure.Panel>
);
