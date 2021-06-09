import React from 'react';
import { Disclosure } from '@headlessui/react';
import { IEncryptionData, IFramingData, IVideoData } from '../../types/api/data';
import { HiArrowNarrowDown } from 'react-icons/all';
import { FaHistory } from 'react-icons/fa';

type IProps = { videoData?: IVideoData[]; framingData: IFramingData[]; encryptionData: IEncryptionData[] };

const Settings: React.FC<IProps> = ({ }) => {

}
export default Settings;
