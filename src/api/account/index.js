import { axios } from '@/utils'
const PRE_URL = '/api'

export default {
  getUser (id) {
    return axios.get(`${PRE_URL}/user/all/`, {
      params: {
        ...id
      }
    })
  }
}
