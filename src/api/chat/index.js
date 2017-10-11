
import { axios } from '@/utils'
const PRE_URL = '/api'

export default {
  sendMsg (params) {
    return axios.post(`${PRE_URL}/chat/send/`, params)
  }
}
