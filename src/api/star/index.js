
import { axios } from '@/utils'
const PRE_URL = '/api'

export default {
  getAllNews () {
    return axios.get(`${PRE_URL}/star/allNews/`)
  },
  getStarInfo (params) {
    return axios.get(`${PRE_URL}/star/info/`,
      {
        params
      })
  },
  getStars (params) {
    return axios.post(`${PRE_URL}/star/allstar/`, params)
  },
  getStarRandom (params) {
    return axios.post(`${PRE_URL}/star/one/`, params)
  },
  getStarsById (params) {
    return axios.get(`${PRE_URL}/marketting/card/`, {
      params
    })
  },
  insertStarById (params) {
    return axios.post(`${PRE_URL}/marketting/insert/`, params)
  }
}
