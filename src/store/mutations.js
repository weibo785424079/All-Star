import {
    GET_USERINFO
} from './mutation-types'

export default {
    // 获取用户信息存入state
  [GET_USERINFO] (state, info) {
    state.userInfo = {...info}
  }
}
