import axios from 'axios';
import {apiEndPoint,
        uploadCredentialApi} from '../config/config';
import {message} from 'antd';

const qs = require('qs');

//初始化axios
const Axios = axios.create({
    baseURL: apiEndPoint,
    timeout: 5000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//传参序列化(添加拦截器) perHandler
Axios.interceptors.request.use(
    config => {
        if(config.url.indexOf(uploadCredentialApi) != -1){
            console.log("upload file");
            config.headers = {"Content-Type": "multipart/form-data"}
        } else if(config.method === "post" || config.method === "get" || config.method === "delete") {
            config.data = qs.stringify(config.data);
        }
        // token Auth
        if(localStorage.token){
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(error.data.error.message);
    }
);

Axios.interceptors.response.use(
    res => {
        if(res.status != 200){
            message.error({
                showClose: true,
                message: error,
                type: res.data.error.message.message?res.data.message.message : res.data.message
            });
            return Promise.reject(res.data.message);
        }
        return res;
    },
    error => {
        if(error.response) {
            console.log(error.response.status);
            switch(error.response.status){
                case 401: //后台保证登陆失效 或未认证状态下返回401
                    message.error("登陆失效，请重新登陆！");
                    window.location = '/';
                    return;
                default:
                    break;
            }
        }
    }
);

export default Axios;