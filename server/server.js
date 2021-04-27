// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const cors = require('cors');
const app = express();
app.use(cors());
const port = 4000;

const randomScalingFactor = () => {
	return Math.round(Math.random() * 1000);
};

const videoData = {
	bitrate: 1,
	ping: randomScalingFactor(),
	protocol: 'UDP',
	protocolVersion: 'IPv4'
};

const framingData = {
	errorsDetected: randomScalingFactor(),
	errorsCorrected: randomScalingFactor()
};

const encryptionData = {
	isEnabled: true,
	type: 'RSA'
};

app.get('/video', (req, res) => {
	res.send(videoData);
});

app.get('/framing', (req, res) => {
	res.send(framingData);
});

app.get('/encryption', (req, res) => {
	res.send(encryptionData);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
