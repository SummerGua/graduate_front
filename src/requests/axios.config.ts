import axios from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 10000
})

server.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') as string

export default server
