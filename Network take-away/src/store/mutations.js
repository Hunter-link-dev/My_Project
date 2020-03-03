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

import Vue from 'vue'

export default {
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
    [RECEIVE_USERINFO](state,{userInfo}){
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state){
        state.userInfo = {}
    },

    [RECEIVE_GOODS](state,{goods}){
        state.goods = goods
    },
    [RECEIVE_RATINGS](state,{ratings}){
        state.ratings = ratings
    },
    [RECEIVE_INFO](state,{info}){
        state.info = info
    },

    [RECREMENT_FOOD_COUNT](state,{food}){
        if (!food.count) {
            Vue.set(food,'count',1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state,{isAdd,food}){
        if(food.count){
            food.count--
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },

    [CLEAR_COUNT](state){
        state.cartFoods.forEach(food => food.count = 0)
        state.cartFoods = []
    },

    [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
        state.searchShops = searchShops
      },
}

