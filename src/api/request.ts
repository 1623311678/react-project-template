

// 订单ajax请求
import axios from 'axios';
import qs from 'qs';
import { message } from "antd";

import { MEDIA_BASE_URL, EXPORT_BASE_URL } from './baseURL'

const token = localStorage.getItem("token");
const service = axios.create({
    // timeout: 100000,
    headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
    }
});
service.interceptors.request.use(
    config => {
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error.message);
    }
);
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            message.error('接口请求超时');
        }
        return Promise.reject(error.message);
    }
);
const URLS = {
    //文件上传
    mediaURL: MEDIA_BASE_URL,
    //文件导出
    exportURL: EXPORT_BASE_URL,
};
export default function (config) {
    const uri = URLS[config['type']];
    if (!uri) throw '未获取到该type对应的baseURL';
    config.baseURL = uri;
    return service(config);
}
