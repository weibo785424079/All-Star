import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Hello'
const chat = r => require.ensure([], () => r(require('@/components/chat')), 'chat')

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
    }
  ]
})
