// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
const app = express();
const port = 4000;

const videoData = {};

const simulateData = () => {};

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
