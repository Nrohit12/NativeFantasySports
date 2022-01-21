import axios from 'axios'
import {api_key} from './api_key'

const matchUrl = "http://15.206.110.130:5001/matches";
export const apiMatch = axios.create({
  baseURL : matchUrl,
  headers: {
    Authorization:`Bearer ${api_key}`,
  }
})


// const playerUrl = "http://15.206.110.130:5001/squad/players?match_id=6432";
// export const apiPlayer = axios.create({
//   baseURL : playerUrl
// })

// const squadUrl = "http://15.206.110.130:5001/squad?match_id=6432"
// export const apiPlayer = axios.create({
//   baseURL : squadUrl
// })