import axios from 'axios'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL = 'http://localhost:5000/' //默认路径，这里也可以使用env来判断环境
// let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Http = axios.create({
    timeout: 5000, // 请求超时时间
    baseURL: "",
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
// 添加请求拦截器
Http.interceptors.request.use(config => {
    // config.data = config.data ? config.data : {}
    // loadingInstance = Loading.service({
    //     lock: true,
    //     text: '努力加载中...'
    // })
    return config
})
// 添加响应拦截器
Http.interceptors.response.use(response => {
    // loadingInstance.close()
    return response.data
}, error => {
    console.log('error', error)
    // const msg = error.Message !== undefined ? error.Message : ''
    // Message({
    //     message: '网络错误' + msg,
    //     type: 'error',
    //     duration: 3 * 1000
    // })
    // loadingInstance.close()
    return Promise.reject(error)
})
