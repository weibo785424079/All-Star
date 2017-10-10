import { axios } from '@/utils'
const PRE_URL = '/api'

export default {
  getUsers (params) {
    return axios.get(`${PRE_URL}/user/all/`)
  }
}
