import axios from './axios'

// type DognoteResultData = string

export const getDognote = () => {
  return axios.get<string>('http://localhost:3000/dognote')
}

