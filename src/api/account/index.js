import { axios } from '@/utils'
const PRE_URL = '/api'

export default {
  getUser (id) {
    return axios.get(`${PRE_URL}/user/one/`, {
      params: {
        ...id
      }
    })
  },
  login (params) {
    return axios.post(`${PRE_URL}/user/login`, params)
  },
  checkLogin () {
    return axios.get(`${PRE_URL}/user/checklogin`)
  },
  logOut () {
    return axios.get(`${PRE_URL}/user/logout/`)
  }
}
