import Http from './axios'
import md5 from 'md5'

// 数据统计
export const statistics = (data = {}) => {
  return new Promise((resolve, reject) => {
    const urlQuery = fetchUrl();
    const visitId = urlQuery.utm_id || localStorage.getItem('visit-id') || md5(+new Date() + '');
    localStorage.setItem('visit-id', visitId);
    const config = {
      headers: {
        'visit-id': visitId
      }
    };
    const defaults = {
      // 访问或操作地址
      url: window.location.href,
      // 页面或操作标识
      code: window.location.pathname,
      // 位置标识
      position_code: '',
      // 请求次数
      num: 1,
      // 停留时长
      duration: '',
      // 停留时长的标识, 用于统计页面时长开始和结束的唯一标识
      duration_mark: '',
      // 这个只是注册时用的临时token
      token: data.token,
      // 来源 官网OS, 及推广
      source: urlQuery.utm_source || 'OS',
      // 媒介 PC H5
      medium: urlQuery.utm_medium || (isPc() ? 'PC' : 'H5'),
      // 系列
      campaign: urlQuery.utm_campaign,
      // 组/单元
      content: urlQuery.utm_content,
      // 关键词
      term: urlQuery.utm_term
    };
    let params = Object.assign(defaults, data);
    Http.post('commonFun/statistics', params, config).then((res) => {
      resolve();
    }).catch(() => {
      reject();
    });
  });
}

// 获取url的query
export const fetchUrl = (url) => {
  url = url || decodeURIComponent(window.location.href);
  let result = {};
  const query = url.split('?')[1];
  if (!query) return result;
  const arr = query.split('&');
  arr.forEach(item => {
    let key = item.split('=')[0];
    result[key] = item.split('=')[1];
  });
  return result;
}

// 是否为PC端
export const isPc = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};


// 获取一段随机代码 6-10字符加时间戳
export const randomCoding = () => {
  //创建26个字母数组
  const arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let idvalue = "";
  const n = Math.ceil(Math.random() * 5 + 5); //这个值可以改变的，对应的生成多少个字母，根据自己需求所改
  for (let i = 0; i < n; i++) {
    idvalue += arr[Math.floor(Math.random() * 26)];
  }
  return idvalue + new Date().getTime();
};
