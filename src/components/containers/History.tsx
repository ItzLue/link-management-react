import React from 'react';
import { Disclosure } from '@headlessui/react';
import { IEncryptionData, IFramingData, IVideoData } from '../../types/api/data';
import { HiArrowNarrowDown } from 'react-icons/all';
import { FaHistory } from 'react-icons/fa';

type IProps = { videoData?: IVideoData[]; framingData: IFramingData[]; encryptionData: IEncryptionData[] };

const History: React.FC<IProps> = ({ videoData, framingData, encryptionData }) => {
	return (
		<div className='w-full px-4 pt-16'>
			<h1 className='text-center text-2xl'>
				<FaHistory className='mr-2 inline' />
				Previous transmissions
			</h1>
			<div className='w-full max-w-md p-2 mx-auto bg-white rounded-2xl'>
				<Disclosure as='div' className='mt-2'>
					{({ open }) => (
						<>
							<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
								<span>23-05-21 10:00</span>
								<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
							</Disclosure.Button>
							<Disclosure.Panel>
								<Disclosure as='div' className='mt-2'>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
												<span>Video</span>
												<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
											</Disclosure.Button>
											<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>Ping: {videoData && videoData[0].ping}</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</Disclosure.Panel>
							<Disclosure.Panel>
								<Disclosure as='div' className='mt-2'>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
												<span>Framing</span>
												<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
											</Disclosure.Button>
											<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>Erros corrected: {framingData && framingData[0].errorsCorrected}</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</Disclosure.Panel>
							<Disclosure.Panel>
								<Disclosure as='div' className='mt-2'>
									{({ open }) => (
										<>
											<Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
												<span>Encryption</span>
												<HiArrowNarrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
											</Disclosure.Button>
											<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>Type: {encryptionData && encryptionData[0].type}</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default History;
