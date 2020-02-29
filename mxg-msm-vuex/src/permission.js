import router from './router'
import {getUserInfo} from '@/api/login'
import store from './store/index'

router.beforeEach((to,from,next) => {
    const token = store.state.user.token
    // const token = localStorage.getItem('mxg-msm-token')
    if (!token) {
        if (to.path != '/login') {
            next({path:'/login'})
        } else {
            next()
        }
    } 
    else {
        if (to.path === '/login') {
            next()
        } else {
            const userInfo = store.state.user.user
            // const userInfo = localStorage.removeItem('mxg-msm-user')
            if (userInfo) {
                next()
            } else {
                store.dispatch('GetUserInfo').then(response => {
                    if (response.flag) {
                        next()
                    } else {
                        next({path:'/login'})
                    }
                }).catch(error => {

                })
                // getUserInfo(token).then(response => {
                //     const resp = response.data
                //     if (resp.flag) {
                //         localStorage.setItem('mxg-msm-user',JSON.stringify(resp.data))
                //         next()
                //     } else {
                //         next({path:'/login'})
                //     }
                // })
            }
        }
        
    }
})