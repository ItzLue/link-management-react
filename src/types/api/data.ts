export type IVideoData = {
	bitrate: number;
	max_package_size: number;
	min_package_size: number;
	ping: number;
	protocol: string;
	protocol_version: string;
};

export type IEncryptionData = {
	encrypted: number;
	process_time: number;
	type: string;
};

export type IFramingData = {
	error_corr_rate: number;
	error_det_rate: number;
	errors_detected: number;
	errors_corrected: number;
	process_time: number;
	bit_change_rate: number;
	bits_changed: number;
};

export type ILinkData = {
	video_packets_received: number;
	video_delay: number;
	video_bitrate: number;
	process_time: number;
	framing_errors_corrected: number;
	framing_errors_detected: number;
};

export type IReadAllData = {
	ID: Date;
	link: ILinkData[];
	video: IVideoData[];
	framing: IFramingData[];
	encryption: IEncryptionData[];
};

export type ITransmissionData = {
	encryption: IEncryptionData;
	framing: IFramingData;
	link: ILinkData;
	video: IVideoData;
};

export type IParsedTransmission = { transmissionTimestamp: string } & ITransmissionData;
export type IAllParsedResponse = { simulationTimestamp: string; transmissions: IParsedTransmission[] };
export type IAllRawResponse = Record<string, IRawResponse>;
export type IRawResponse = Record<string, ITransmissionData>;
