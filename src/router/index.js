import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index')
    },
    {
        path: '/details',
        name: 'details',
        component: () => import('../views/details')
    },
    {
        path: '/videoInfo',
        name: 'videoInfo',
        component: () => import('../views/videoInfo')
    }
]

const router = new VueRouter({
    routes
})

export default router
