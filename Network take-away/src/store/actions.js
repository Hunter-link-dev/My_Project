import {
    reqAddress,
    reqShopCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo,
    reqSearchShop
} from '../api/index'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RECREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_COUNT,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
    async getAddress({commit,state}){
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
    },
    async getCategorys({commit}){
        const result = await reqShopCategorys()
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    async getShops({commit,state}){
        const {longitude,latitude} = state
        const result = await reqShops(longitude,latitude)
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    recordUser({commit},userInfo){
        
            commit(RECEIVE_USERINFO,{userInfo})
        
    },

    //异步获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USERINFO,{userInfo})
        }
    },

    //退出登录
    async getLogout({commit}){
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },

    async getShopGoods({commit},callpack){
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})
            callpack&&callpack()
        }
    },
    async getShopRatings({commit},callback){
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            callback&&callback()
        }
    },
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO,{info})
        }
    },

    updateFoodCount({commit},{isAdd,food}){
        if (isAdd) {
            commit(RECREMENT_FOOD_COUNT,{food})
        } else {
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },

    clearCart({commit}){
        commit(CLEAR_COUNT)
    },

    // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}