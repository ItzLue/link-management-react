export type IVideoData = {
	bitrate: number;
	ping: number;
	protocol: string;
	protocolVersion: string;
};

export type IEncryptionData = {
	isEnabled: boolean;
	type: string;
};

export type IFramingData = {
	errorsDetected: number;
	errorsCorrected: number;
};

export type IResCurrentData = {
	message: string;
	data: {
		video: IVideoData;
		encryption: IEncryptionData;
		framing: IFramingData;
	};
};
