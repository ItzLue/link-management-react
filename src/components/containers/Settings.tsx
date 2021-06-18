import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HiAdjustments } from 'react-icons/hi';
import { ISettingsForm } from '../../types/settings-form';
import { IEncryptionData, IFramingData, ILinkData, ITransmissionData, IVideoData } from '../../types/api/data';

type IProps = {
	defaultValues?: ITransmissionData;
	onSubmit: (data: ISettingsForm) => void;
};

const Settings: React.FC<IProps> = ({ defaultValues = undefined, onSubmit }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();
	const stepsize = 0.0000000000001;

	const setDefaultValuesEncryption = (data: IEncryptionData) => {
		setValue('framing_process_time', data.process_time);
		setValue('encryption_type', data.type);
		setValue('encryption_encrypted', data.encrypted === 1 && 'checked');
	};

	const setDefaultValuesFraming = (data: IFramingData) => {
		setValue('framing_bit_change_rate', data.bit_change_rate);
		setValue('encryption_process_time', data.process_time);
		setValue('framing_error_det_rate', data.error_det_rate);
		setValue('framing_error_corr_rate', data.error_corr_rate);
	};

	const setDefaultValuesVideo = (data: IVideoData) => {
		setValue('video_max_package_size', data.max_package_size);
		setValue('video_min_package_size', data.min_package_size);
		setValue('video_ping', data.ping);
		setValue('video_protocol', data.protocol);
		setValue('video_bit_rate', data.bitrate);
	};

	const setDefaultValuesLink = (data: ILinkData) => {
		setValue('link_process_time', data.process_time);
		setValue('link_video_delay', data.video_delay);
	};

	useEffect(() => {
		if (defaultValues?.encryption.encrypted === undefined) return;
		setDefaultValuesEncryption(defaultValues.encryption);
		setDefaultValuesFraming(defaultValues.framing);
		setDefaultValuesVideo(defaultValues.video);
		setDefaultValuesLink(defaultValues.link);
	}, []);

	const inputClassName =
		'w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='my-8 mx-4 pb-8 space-y-4 text-center my-16'>
			<div className='w-full px-4'>
				<h1 className='text-center text-2xl'>
					<HiAdjustments className='mr-2 inline' />
					Settings
				</h1>
			</div>
			<h1 className='text-xl'>Encryption</h1>
			<div>
				<label className='mr-4'>Enccrypted</label>
				<input type='checkbox' {...register('encryption_encrypted')} />
			</div>
			<div>
				<label>Encryption process time</label>
				<input type='number' placeholder='0.1' className={inputClassName} step={stepsize} {...register('encryption_process_time', { required: true })} />
			</div>
			<div>
				<label>Encryption type</label>
				<select className={inputClassName} {...register('encryption_type')}>
					<option value='RSA' defaultValue='RSA'>
						RSA
					</option>
					<option value='AES' disabled={true}>
						AES
					</option>
				</select>
			</div>

			<h1>Framing</h1>
			<div>
				<label>Framing process time</label>
				<input type='number' placeholder='0.1' className={inputClassName} step={stepsize} {...register('framing_process_time', { required: true })} />
			</div>
			<div>
				<label>Framing error detection rate</label>
				<input type='number' placeholder='0.3' className={inputClassName} step={stepsize} {...register('framing_error_det_rate', { required: true })} />
			</div>
			<div>
				<label>Framing error correction rate</label>
				<input type='number' placeholder='0.3' className={inputClassName} step={stepsize} {...register('framing_error_corr_rate', { required: true })} />
			</div>
			<div>
				<label>Bits change rate</label>
				<input type='number' placeholder='0.3' className={inputClassName} step={stepsize} {...register('framing_bit_change_rate', { required: true })} />
			</div>

			<h1>Video</h1>
			<div>
				<label>Max package size</label>
				<input type='number' placeholder='3000' className={inputClassName} step={stepsize} {...register('video_max_package_size', { required: true })} />
			</div>
			<div>
				<label>Min package size</label>
				<input type='number' placeholder='100' className={inputClassName} step={stepsize} {...register('video_min_package_size', { required: true })} />
			</div>
			<div>
				<label>Ping</label>
				<input type='number' placeholder='4' className={inputClassName} step={stepsize} {...register('video_ping', { required: true })} />
			</div>
			<div>
				<label>Protocol version</label>
				<select className={inputClassName} {...register('video_protocol_version')}>
					<option value='IPv4'>IPv4</option>
					<option value='IPv6' disabled={true}>
						IPv6
					</option>
				</select>
			</div>
			<div>
				<label>Protocol</label>
				<select className={inputClassName} {...register('video_protocol')}>
					<option value='UDP'>UDP</option>
					<option value='TCP' disabled={true}>
						TCP
					</option>
				</select>
			</div>
			<div>
				<label>Bitrate</label>
				<input type='number' placeholder='1000' className={inputClassName} step={stepsize} {...register('video_bit_rate', { required: true })} />
			</div>

			<h1>Link</h1>
			<div>
				<label>Process time</label>
				<input type='number' placeholder='0.1' className={inputClassName} step={stepsize} {...register('link_process_time', { required: true })} />
			</div>
			<div>
				<label>Delay</label>
				<input type='number' placeholder='4' className={inputClassName} step={stepsize} {...register('link_video_delay', { required: true })} />
			</div>
			<div>
				<input className='px-4 py-2 bg-red-400 rounded-lg text-white' type='submit' />
			</div>
		</form>
	);
};
export default Settings;
