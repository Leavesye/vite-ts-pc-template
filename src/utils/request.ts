// import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
// Vue.prototype.$request = service
export default service
