import axios from 'axios'
import { Loading , Message } from 'element-ui';

const loading = {
    loadingInstance:null,
    open:function() {
        if (this.loadingInstance === null) {
            this.loadingInstance = Loading.service({
                target:'.main',
                text:'拼命加载中',
                backgroundcolor:'rgbn(0,0,0,0.5)',
            });
        }
        
    },
    close:function() {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}

const request = axios.create({
    // baseURL:'/',
    // baseURL:'/dev-api',
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000    
})

//请求拦截器
request.interceptors.request.use(config => {
    loading.open()
    return config
},error => {
    loading.close()
    return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(response => {
    loading.close()
    const resp = response.data
    if (resp.code !== 2000) {
        Message({
            message:resp.message || '系统异常',
            type:'warning',
            duration:5000
        })
    }
    return response
},error => {
    loading.close()
    Message({
        message:error.message,
        type:'error',
        duration:5000
    })
    return Promise.reject(error)
})

// request.get('/db.json').then(response => {
//     console.log(response.data);   
// })

export default request;