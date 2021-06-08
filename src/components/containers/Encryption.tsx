import React from 'react';
import { IEncryptionData } from '../../types/api/data';
import {HiLockClosed} from "react-icons/all";

type IProps = { data?: IEncryptionData[] };

const Encryption: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='text-center'>
				<p>ENCRYPTION DATA</p>
			</div>
			<div className='text-center bg-red-400'>
				<p> Encryption {data?.[data?.length - 1].isEnabled}</p>
				<p>Type {data?.[data?.length - 1].type}</p>
			</div>
			<div>
				<HiLockClosed/>
			</div>
		</div>
	);
};

export default Encryption;
