import axios from 'axios'
import { authStore } from '../App'

const { REACT_APP_API_URL } = process.env

const instance = axios.create({
    baseURL: REACT_APP_API_URL
})

instance.interceptors.request.use(
    (config) => {
        const token = authStore.accessToken

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    (error) => {
        console.log('HTTP Request error')
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response.status === 401 && !location.href.includes('login')) {
            const isRefreshInvalid = error.response.data.error

            if (isRefreshInvalid) {
                window.location = '/'
                localStorage.clear()
            } else {
                await authStore.refresh()
                return instance.request(error.config)
            }
        }

        return Promise.reject(error)
    }
)

export default instance
