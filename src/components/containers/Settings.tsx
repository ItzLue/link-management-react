import React from 'react';
import { useForm } from 'react-hook-form';
import { HiAdjustments } from 'react-icons/hi';
import { ISettingsForm } from '../../types/settings-form';

type IProps = { onSubmit: (data: ISettingsForm) => void };

const Settings: React.FC<IProps> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

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
			<h1>Encryption</h1>
			<input type='number' placeholder='Encryption process time' className={inputClassName} {...register('encryption_process_time', { required: true })} />
			<input type='text' placeholder='Encryption type' className={inputClassName} {...register('encryption_type', { required: true })} />
			<input type='number' placeholder='Encryption encrypted' className={inputClassName} {...register('encryption_encrypted', { required: true })} />

			<h1>Framing</h1>
			<input type='number' placeholder='Framing process time' className={inputClassName} {...register('framing_process_time', { required: true })} />
			<input type='number' placeholder='Framing errors detected' className={inputClassName} {...register('framing_errors_detected', { required: true })} />
			<input type='number' placeholder='Framing errors corrected' className={inputClassName} {...register('framing_errors_corrected', { required: true })} />
			<input type='number' placeholder='Framing error det rate' className={inputClassName} {...register('framing_error_det_rate', { required: true })} />
			<input type='number' placeholder='Framing error corr rate' className={inputClassName} {...register('framing_error_corr_rate', { required: true })} />

			<h1>Video</h1>
			<input type='number' placeholder='Max package size' className={inputClassName} {...register('video_max_package_size', { required: true })} />
			<input type='number' placeholder='Min package size' className={inputClassName} {...register('video_min_package_size', { required: true })} />
			<input type='number' placeholder='Ping' className={inputClassName} {...register('video_ping', { required: true })} />
			<select className={inputClassName} {...register('video_protocol_version')}>
				<option value='IPv4'>IPv4</option>
				<option value='IPv6' disabled={true}>
					IPv6
				</option>
			</select>
			<select className={inputClassName} {...register('video_protocol')}>
				<option value='UDP'>UDP</option>
				<option value='TCP' disabled={true}>
					TCP
				</option>
			</select>
			<input type='number' placeholder='Bitrate' className={inputClassName} {...register('video_bit_rate', { required: true })} />

			<h1>Link</h1>
			<input type='number' placeholder='Process time' className={inputClassName} {...register('link_process_time', { required: true })} />
			<input type='number' placeholder='Video packets received' className={inputClassName} {...register('link_video_packets_received', { required: true })} />
			<input type='number' placeholder='Video delay' className={inputClassName} {...register('link_video_delay', { required: true })} />
			<input type='number' placeholder='Framing errors detected' className={inputClassName} {...register('link_framing_errors_detected', { required: true })} />
			<input type='number' placeholder='Framing errors corrected' className={inputClassName} {...register('link_framing_errors_corrected', { required: true })} />
			<input className='px-4 py-2 bg-red-400 rounded-lg text-white' type='submit' />
		</form>
	);
};
export default Settings;
