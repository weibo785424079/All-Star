// axios 拦截配置
import axios from 'axios'
import router from '../router'
axios.default.baseURL = '/'
axios.defaults.timeout = 20000

// request拦截器
axios.interceptors.request.use(
    config => {
        // 配置token到header中
      const storeUserToken = localStorage.getItem('userToken')
      config.headers.userToken = storeUserToken
      return config
    },
    error => {
      return Promise.reject(error)
    }
)

// resopnse 拦截器
axios.interceptors.response.use(
    response => {
      const { data } = response
      // 后端定义一个状态码 让用户重新登录
      if (data.status === 10001 && router.currentRoute.path !== '/' && router.currentRoute.path !== '/index') {
        router.push({
          path: '/login'
        })
      } else {
        return JSON.parse(JSON.stringify(response))
      }
    },
    error => {
      return Promise.reject(error.response)
    }
)

export default axios
