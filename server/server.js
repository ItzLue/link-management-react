// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const bodyParser = require('body-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
const port = 4000;

const randomScalingFactor = () => {
	return Math.round(Math.random() * 1000);
};

const encryptionData = {
	isEnabled: true,
	type: 'RSA'
};

app.get('/video', (req, res) => {
	res.send({
		bitrate: randomScalingFactor(),
		ping: randomScalingFactor(),
		protocol: 'UDP',
		protocolVersion: 'IPv4'
	});
});

app.get('/framing', (req, res) => {
	res.send({
		errorsDetected: randomScalingFactor(),
		errorsCorrected: randomScalingFactor()
	});
});

app.get('/encryption', (req, res) => {
	res.send(encryptionData);
});

app.get('/test', (req, res) => {
	console.log(req.query);
	return res.sendStatus(200);
});

app.post('/settings', async (req, res) => {
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	res.end('Posted');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
