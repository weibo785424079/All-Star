import Vue from 'vue'
import Router from 'vue-router'
import userApi from '@/api/account'
import HelloWorld from '@/components/Hello'
import Store from '@/store'
const chat = r => require.ensure([], () => r(require('@/components/chat')), 'chat')
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('@/components/profile/profile')), 'profile')
const getstar = r => require.ensure([], () => r(require('@/components/getstar/getstar')), 'getstar')
const games = r => require.ensure([], () => r(require('@/components/games/star-ship-war')), 'games')
const upload = r => require.ensure([], () => r(require('@/components/upload/upload')), 'upload')
const home = r => require.ensure([], () => r(require('@/components/home/home')), 'home')
const setInfo = r => require.ensure([], () => r(require('@/components/home/setInfo/setInfo')), 'setInfo')
const blog = r => require.ensure([], () => r(require('@/components/blog/blog')), 'blog')

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: HelloWorld
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/getstar',
      name: 'getstar',
      component: getstar
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/games',
      name: 'games',
      component: games
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/setInfo',
      name: 'setInfo',
      component: setInfo
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  if (to.fullPath !== '/index' && to.fullPath !== '/login') {
    // footGuide也有checklogin不加判断会死循环
    var userInfo = await userApi.checkLogin()
    Store.commit('GET_USERINFO', userInfo.data.data)
  }
  next()
})

export default router
