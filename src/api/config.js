import axios from 'axios'
import { authStore } from '../App'
import { setupCache, buildMemoryStorage, defaultKeyGenerator, defaultHeaderInterpreter } from 'axios-cache-interceptor'

const { REACT_APP_API_URL } = process.env

const instance = setupCache(
    axios.create({
        baseURL: REACT_APP_API_URL
    }),

    // All options with their default values
    {
        // The storage to save the cache data. There are more available by default.
        //
        // https://axios-cache-interceptor.js.org/#/pages/storages
        storage: buildMemoryStorage(),

        // The mechanism to generate a unique key for each request.
        //
        // https://axios-cache-interceptor.js.org/#/pages/request-id
        generateKey: defaultKeyGenerator,

        // The mechanism to interpret headers (when cache.interpretHeader is true).
        //
        // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=headerinterpreter
        headerInterpreter: defaultHeaderInterpreter,

        // The function that will receive debug information.
        // NOTE: For this to work, you need to enable development mode.
        //
        // https://axios-cache-interceptor.js.org/#/pages/development-mode
        // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=debug
        debug: undefined
    }
)

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
            const isRefreshInvalid = error.response.data.error

            if (isRefreshInvalid) {
                authStore.logout()
            } else {
                await authStore.refresh()
                return instance.request(error.config)
            }
        }

        return Promise.reject(error)
    }
)

export default instance
