import request from '@/utils/request'

export default {
    checkPwd(userId,pwd){
        return request({
        url: '/user/pwd',
        method:'post',
        data() {
            userId,
            password
        },
        })
    },
    updatePwd(userId,pwd){
        return request({
        url: '/user/pwd',
        method:'put',
        data() {
            userId,
            password
        },
        })
    },
}