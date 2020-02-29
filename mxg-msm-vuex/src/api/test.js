import request from '@/utils/request'

//这里的 定义的我们后来是没有用到的
// const BASE_URL = process.env.VUE_APP_BASE_API

// request.get('/db.json').then(response => {
//     console.log(response.data);    
// })

request({
    method:'get',
    url: '/db.json'
}).then(response => {
        console.log('get2',response.data);    
})

export default {
    getList(){
        const req = request({
            method:'get',
            url: '/db.json'
        })
        return req
    }
}

