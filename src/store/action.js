import {
    GET_USERINFO
} from './mutation-types'
import accountApi from '../api/account'
export default {
  async getUser ({
      commit,
      state
  }, id) {
    let res = await accountApi.getUser(id)
    commit(GET_USERINFO, res.data.data[0])
    return res
  }
}
