import React from 'react';
import { IEncryptionData } from '../../types/api/data';

type IProps = { data?: IEncryptionData[] };

const Encryption: React.FC<IProps> = ({ data }) => {
	return (
		<div>
			<div className='text-center'>
				<p>ENCRYPTION DATA</p>
			</div>
			<div className='text-center bg-red-400'>
				<p> Encryption {data?.[0].isEnabled}</p>
				<p>Type {data?.[0].type}</p>
			</div>
		</div>
	);
};

export default Encryption;
