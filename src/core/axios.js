import axios from 'axios'

export const DB = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
  responseEncoding: 'utf8',
  method: 'get',
  timeout: 10000000
})
