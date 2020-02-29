import request from '@/utils/request'

export default {
    getList(){
        return request({
        url: '/goods/list',
        method:'get',
        })
    },
    search(page,size,searchMap){
        return request({
        url: `/goods/list/search/${page}/${size}`,
        method:'post',
        data:searchMap
        })
    },
    add(pojo){
        return request({
        url: '/goods',
        method:'post',
        data:pojo,
        })
    },
    getById(id){
        return request({
        url: `/goods/${id}`,
        method:'get'
        })
    },
    update(pojo){
        return request({
        url: `/goods/${pojo.id}`,
        method:'put',
        data:pojo
        })
    },
    // 删除数据
    deleteById(id){
        return request({
        url: `/goods/${id}`,
        method:'delete'
        })
    },
}