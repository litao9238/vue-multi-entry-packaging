import axios from 'axios';
import Vue from 'vue';

const instance = axios.create({
	timeout: 1000 * 20,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	baseURL: process.env.BASE_URL
});

instance.interceptors.request.use(config => {
	// config.headers.Authorization = store.state.token

	// 断网提示
	if (!navigator.onLine) {
		return false;
	}
	if(config.method === 'post') {
		config.data = JSON.stringify(config.data);
	}
	return config
},error => {
	console.log(error);
	return Promise.resolve({});
});

instance.interceptors.response.use(response => {
	console.log(response)
	return Promise.resolve(response.data);
},error => {
	console.log(error);
	// 解决业务解构报错
	return Promise.resolve({});
});

export default instance;