import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';

const instance = axios.create({
	timeout: 1000 * 20,
	baseURL: window.SERVER_PATH
});

instance.interceptors.request.use(config => {
	config.headers.wl_no = window.wl_no;
	config.headers.lang = 'cn';
	config.headers.channel = 'alp023002';

	// 断网提示
	if (!navigator.onLine) {
		return Toast.fail('没有网络');
	}
	if(config.method === 'post') {
		config.data = Qs.stringify(config.data);
	}
	return config
},error => {
	console.log(error);
	return Promise.resolve({});
});

instance.interceptors.response.use(response => {
	const { data } = Object.prototype.toString.call(response) === '[object Object]' ? response : {data: {}};
	data.result = +data.result;
	const { msg, result } = data;
	if(+result !== 200) {
		Toast.fail(msg || '请求错误');
		return Promise.reject(response.data);
	}
	return Promise.resolve(response.data);
},error => {
	console.log(error);
	// 解决业务解构报错
	return Promise.resolve({});
});

export default instance;
