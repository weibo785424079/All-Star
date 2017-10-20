import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Hello'
const chat = r => require.ensure([], () => r(require('@/components/chat')), 'chat')
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')
const profile = r => require.ensure([], () => r(require('@/components/profile/profile')), 'profile')
const getstar = r => require.ensure([], () => r(require('@/components/getstar/getstar')), 'getstar')
const games = r => require.ensure([], () => r(require('@/components/games/star-ship-war')), 'games')

Vue.use(Router)

export default new Router({
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
    }
  ]
})
