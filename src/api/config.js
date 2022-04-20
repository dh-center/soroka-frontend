import axios from 'axios'

const apiURL = 'http://51.250.102.199/'

const instance = axios.create({
    baseURL: apiURL
})

export default instance
