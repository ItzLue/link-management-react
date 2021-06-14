export type IVideoData = {
	delay: number;
	packets_recevied: number;
	protocol: string;
	protocol_Version: string;
};

export type IEncryptionData = {
	isEnabled: boolean;
	type: string;
};

export type IFramingData = {
	errors_detected: number;
	errors_corrected: number;
};

export type ILinkData = {
	video_packets_received: number;
	video_delay: number;
	framing_errors_corrected: number;
	framing_errors_detected: number;
};

export type IReadAllData = {
	link: ILinkData[];
	video: IVideoData[];
	framing: IFramingData[];
	encryption: IEncryptionData[];
};
