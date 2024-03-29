import axios from 'axios';

const API_URLS = {
	localhost: 'http://127.0.0.1:8000',
	loui: 'http://192.168.1.141:8000/',
	frederik: 'http://10.16.171.157:8000',
	sophus: 'http://10.16.171.17:8000',
	live: 'https://34229link.miew.org/'
};

export const backend = axios.create({
	baseURL: `${API_URLS.localhost}/api/sim/data/`,
	params: { api_key: 'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f' }
});
