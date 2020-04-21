import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true
})


API.interceptors.request.use(function (config)  {

  if (localStorage.getItem('authToken')) {
    config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`
  }

  return config

})


API.interceptors.response.use(function (response) {

  if (response.status === 401) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
  }

  if (response.data.token) {
    const token = response.data.token
    localStorage.setItem('authToken', token)
    localStorage.setItem('tokenExpiry', (Date.now() + 86400))
  }

  return response

})

export default API