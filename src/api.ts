import axios from 'axios';

const API_URLS = {
	localhost: 'http://localhost:4000'
};

export const backend = axios.create({
	baseURL: `${API_URLS.localhost}/`
});
