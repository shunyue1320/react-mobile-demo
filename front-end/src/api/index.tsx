import axios from "axios";
// 默认的接口地址
axios.defaults.baseURL = process.env.NODE_ENV ===  "development" ? "http://localhost:9678" : ""; // "http://class.guojianbo.top";

// 请求体的类型 JSON 格式
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 拦截请求
axios.interceptors.request.use((config) => {
  let access_token = sessionStorage.getItem('access_token');
  config.headers = {
    Authorization: `Bearer ${access_token}`
  }
  return config;
}, error => Promise.reject(error));


// 拦截响应
axios.interceptors.response.use(response => {
  return response.data
},error => {
  Promise.reject(error)
})

export default axios;