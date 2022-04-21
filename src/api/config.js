import axios from 'axios'
import CreateAuthStore from "../stores/createAuthStore";

const apiURL = 'http://51.250.102.199/v1/'

const instance = axios.create({
    baseURL: apiURL
})

const authStore = new CreateAuthStore()

instance.interceptors.request.use(
    (config) => {
        const token = authStore.accessToken;

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
            const isInactiveAccount = error.response.data.detail === 'No active account found with the given credentials'
            const isRefreshInvalid = error.response.data.code === 'token_not_valid' && !error.response.data.messages
            const isTokenExist = authStore.refreshToken

            if (!isTokenExist) {
                window.location = '/'
                localStorage.clear()
            }

            if (!isInactiveAccount) {
                if (!isRefreshInvalid) {
                    await authStore.refresh()
                    return instance.request(error.config)
                }

                if (isRefreshInvalid) {
                    window.location = '/'
                    localStorage.clear()
                }
            }
        }

        return Promise.reject(error)
    }
)

export default instance
