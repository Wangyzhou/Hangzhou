import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import Home from '../components/Home.vue'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes=[
    // {
    //     path: '/',
    //     redirect: '/home' //重定向
    // },
    {
        path: '/home',
        name:'Home',
        component: Home,
        meta: {
            title: '首页',
            keepAlive: true // 标记需要被缓存
        },
    },
    {
        path:'/maptwo',
        name:'maptwo',
        component:() => import('../components/MapTwo.vue'),
        meta: {
            title: '二维',
            keepAlive: true // 标记需要被缓存
        }
    
    },
    {
        path:'/mapthree',
        name:'mapthree',
        component:() => import('../components/MapThree.vue'),
        meta: {
            title: '三维',
            keepAlive: true // 标记需要被缓存
        }
    }
]
const router=new VueRouter({
    mode:'hash',
    base:process.env.BASE_URL,
    routes,
})
export default router;