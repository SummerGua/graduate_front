import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.BASE_URL as string,
  withCredentials: true,
  timeout: 10000
})



export default service
