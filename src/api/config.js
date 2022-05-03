import axios from 'axios'
import { authStore } from "../App";

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
        if (error.response.status === 401) {
            // const isInactiveAccount =
            //     error.response.data.detail === 'No active account found with the given credentials'
            // console.log({ isInactiveAccount });
            const isRefreshInvalid = error.response.data === 'Unauthorized'
            console.log({ isRefreshInvalid });
            const isTokenExist = authStore.refreshToken
            console.log({ isTokenExist });

            // if (!isTokenExist) {
            //     window.location = '/'
            //     localStorage.clear()
            // }

            if (isRefreshInvalid) {
                await authStore.refresh()
                return instance.request(error.config)
            }

            // if (!isInactiveAccount) {
            //     if (!isRefreshInvalid) {
            //         await authStore.refresh()
            //         return instance.request(error.config)
            //     }

            // }
        }

        return Promise.reject(error)
    }
)

export default instance
