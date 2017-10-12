import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
  // userInfo: {
  //   account: 'weibo',
  //   createTime: null,
  //   gender: '男',
  //   id: 1,
  //   level: 1,
  //   name: 'weibo',
  //   org: 'china\n',
  //   password: 'weibo0719',
  //   status: 1
  // } // 当前用户信息
  userInfo: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
