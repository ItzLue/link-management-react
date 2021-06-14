import axios from 'axios';

const API_URLS = {
	localhost: 'http://192.168.1.141:4000'
};

export const backend = axios.create({
	baseURL: `${API_URLS.localhost}/`,
	params: { API_KEY: '1234' },
	timeout: 2000
});
