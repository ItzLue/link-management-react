import axios from 'axios';

const API_URLS = {
	localhost: 'http://192.168.1.141:4000',
	frederik: 'http://10.16.171.157:8000',
	sophus: 'http://10.16.171.17:8000'
};

export const backend = axios.create({
	baseURL: `${API_URLS.sophus}/api/sim/data/`,
	params: { api_key: 'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f' },
	timeout: 10000
});
