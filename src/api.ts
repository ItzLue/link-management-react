import axios from 'axios';

const API_URLS = {
	localhost: 'http://192.168.1.141:4000'
};

export const backend = axios.create({
	baseURL: `${API_URLS.localhost}/`,
	timeout: 2000
});
