import React from 'react';
import { useForm } from 'react-hook-form';

const Settings: React.FC = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
	console.log(errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Shared timestamp" {...register("Shared timestamp", {})} />
			<input type="number" placeholder="Encryption process time" {...register("Encryption process time", {})} />
			<input type="text" placeholder="Encryption type" {...register("Encryption type", {})} />
			<input type="number" placeholder="Encryption encrypted" {...register("Encryption encrypted", {})} />
			<input type="number" placeholder="Framing process time" {...register("Framing process time", {})} />
			<input type="number" placeholder="Framing errors detected" {...register("Framing errors detected", {})} />
			<input type="number" placeholder="Framing errors corrected" {...register("Framing errors corrected", {})} />
			<input type="number" placeholder="Framing error det rate" {...register("Framing error det rate", {})} />
			<input type="number" placeholder="Framing error corr rate" {...register("Framing error corr rate", {})} />
			<input type="number" placeholder="Video max package size" {...register("Video max package size", {})} />
			<input type="number" placeholder="Video min package size" {...register("Video min package size", {})} />
			<input type="text" placeholder="Video protocol version" {...register("Video protocol version", {})} />
			<input type="text" placeholder="Video protocol" {...register("Video protocol", {})} />
			<input type="number" placeholder="Video bit rate" {...register("Video bit rate", {})} />
			<input type="number" placeholder="Video ping" {...register("Video ping", {})} />
			<input type="number" placeholder="Link process time" {...register("Link process time", {})} />
			<input type="number" placeholder="Link video packets received" {...register("Link video packets received", {})} />
			<input type="number" placeholder="Link video delay" {...register("Link video delay", {})} />
			<input type="number" placeholder="Link framing errors detected" {...register("Link framing errors detected", {})} />
			<input type="number" placeholder="Link framing errors corrected" {...register("Link framing errors corrected", {})} />

			<input type="submit" />
		</form>
	);
}
export default Settings;
