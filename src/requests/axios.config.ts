import axios from 'axios'

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 10000
})

export default server
