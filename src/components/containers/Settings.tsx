import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {HiAdjustments, HiCog} from "react-icons/hi";
import {FaHistory} from "react-icons/fa";

const Settings: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const onSubmit = (data: unknown) => {
		console.log(data);
		axios
			.post('http://localhost:4000/settings', data)
			.then(() => console.log('Form data posted'))
			.catch(() => console.log('Failed to post'));
	};
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

			<input type='text' placeholder='Shared timestamp' className={inputClassName} {...register('Shared timestamp', {})} />

			<div className= 'font-bold text-left'>
				<p> Encryption</p>
			</div>

			<input type='number' placeholder='Encryption process time' className={inputClassName} {...register('Encryption process time', {})} />
			<input type='text' placeholder='Encryption type' className={inputClassName} {...register('Encryption type', {})} />
			<input type='number' placeholder='Encryption encrypted' className={inputClassName} {...register('Encryption encrypted', {})} />

			<div className= 'font-bold text-left'>
				<p> Framing </p>
			</div>

			<input type='number' placeholder='Framing process time' className={inputClassName} {...register('Framing process time', {})} />
			<input type='number' placeholder='Framing errors detected' className={inputClassName} {...register('Framing errors detected', {})} />
			<input type='number' placeholder='Framing errors corrected' className={inputClassName} {...register('Framing errors corrected', {})} />
			<input type='number' placeholder='Framing error det rate' className={inputClassName} {...register('Framing error det rate', {})} />
			<input type='number' placeholder='Framing error corr rate' className={inputClassName} {...register('Framing error corr rate', {})} />

			<div className= 'font-bold text-left'>
				<p> Video</p>
			</div>

			<input type='number' placeholder='Video max package size' className={inputClassName} {...register('Video max package size', {})} />
			<input type='number' placeholder='Video min package size' className={inputClassName} {...register('Video min package size', {})} />
			<input type='text' placeholder='Video protocol version' className={inputClassName} {...register('Video protocol version', {})} />
			<input type='text' placeholder='Video protocol' className={inputClassName} {...register('Video protocol', {})} />
			<input type='number' placeholder='Video bit rate' className={inputClassName} {...register('Video bit rate', {})} />
			<input type='number' placeholder='Video ping' className={inputClassName} {...register('Video ping', {})} />

			<div className= 'font-bold text-left'>
				<p> Link</p>
			</div>

			<input type='number' placeholder='Link process time' className={inputClassName} {...register('Link process time', {})} />
			<input type='number' placeholder='Link video packets received' className={inputClassName} {...register('Link video packets received', {})} />
			<input type='number' placeholder='Link video delay' className={inputClassName} {...register('Link video delay', {})} />
			<input type='number' placeholder='Link framing errors detected' className={inputClassName} {...register('Link framing errors detected', {})} />
			<input type='number' placeholder='Link framing errors corrected' className={inputClassName} {...register('Link framing errors corrected', {})} />
			<input className='px-4 py-2 bg-red-400 rounded-lg text-white' type='submit' />
		</form>
	);
};
export default Settings;
