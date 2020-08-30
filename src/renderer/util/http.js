import axois from 'axios'

const http = axois.create()

http.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
