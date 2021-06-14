import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { HiAdjustments } from 'react-icons/hi';

type IProps = {
	onSubmit: (data: unknown) => void;
};

const Settings: React.FC<IProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	console.log(errors);

	const inputClassName =
		'w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='my-8 mx-4 pb-8 space-y-4 text-center'>
			<div className='w-full px-4'>
				<h1 className='text-center text-2xl'>
					<HiAdjustments className='mr-2 inline' />
					Settings
				</h1>
			</div>

			<input type='text' placeholder='Shared timestamp' className={inputClassName} {...register('shared_timestamp', {})} />

			<h1>Encryption</h1>

			<input type='number' placeholder='Encryption process time' className={inputClassName} {...register('encryption_process_time', {})} />
			<input type='text' placeholder='Encryption type' className={inputClassName} {...register('encryption_type', {})} />
			<input type='number' placeholder='Encryption encrypted' className={inputClassName} {...register('encryption_encrypted', {})} />

			<h1>Framing</h1>

			<input type='number' placeholder='Framing process time' className={inputClassName} {...register('framing_process_time', {})} />
			<input type='number' placeholder='Framing errors detected' className={inputClassName} {...register('framing_errors_detected', {})} />
			<input type='number' placeholder='Framing errors corrected' className={inputClassName} {...register('framing_errors_corrected', {})} />
			<input type='number' placeholder='Framing error det rate' className={inputClassName} {...register('framing_error_det_rate', {})} />
			<input type='number' placeholder='Framing error corr rate' className={inputClassName} {...register('framing_error_corr_rate', {})} />

			<h1>Video</h1>

			<input type='number' placeholder='Video max package size' className={inputClassName} {...register('video_max_package_size', {})} />
			<input type='number' placeholder='Video min package size' className={inputClassName} {...register('video_min_package_size', {})} />
			<input type='text' placeholder='Video protocol version' className={inputClassName} {...register('video_protocol_version', {})} />
			<input type='text' placeholder='Video protocol' className={inputClassName} {...register('video_protocol', {})} />
			<input type='number' placeholder='Video bit rate' className={inputClassName} {...register('video_bit_rate', {})} />
			<input type='number' placeholder='Video ping' className={inputClassName} {...register('video_ping', {})} />

			<h1>Link</h1>

			<input type='number' placeholder='Link process time' className={inputClassName} {...register('link_process_time', {})} />
			<input type='number' placeholder='Link video packets received' className={inputClassName} {...register('link_video_packets_received', {})} />
			<input type='number' placeholder='Link video delay' className={inputClassName} {...register('link_video_delay', {})} />
			<input type='number' placeholder='Link framing errors detected' className={inputClassName} {...register('link_framing_errors_detected', {})} />
			<input type='number' placeholder='Link framing errors corrected' className={inputClassName} {...register('link_framing_errors_corrected', {})} />
			<input className='px-4 py-2 bg-red-400 rounded-lg text-white' type='submit' />
		</form>
	);
};
export default Settings;
