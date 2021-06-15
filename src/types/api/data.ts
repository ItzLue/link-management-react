export type IVideoData = {
	bitrate: number;
	max_package_size: number;
	min_package_size: number;
	ping: number;
	packets_recevied: number;
	protocol: string;
	protocol_Version: string;
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
};

export type ILinkData = {
	video_packets_received: number;
	video_delay: number;
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
