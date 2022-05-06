import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'

export default class AuthStore {
    accessToken = ''
    refreshToken = ''

    currentUser = null

    constructor() {
        makeAutoObservable(this)
    }

    setAccessToken(payload) {
        this.accessToken = payload
    }

    setRefreshToken(payload) {
        this.refreshToken = payload
    }

    setCurrentUser(payload) {
        this.currentUser = payload
    }

    async refresh() {
        const refresh = this.refreshToken || localStorage.getItem('refreshToken')
        const response = await AuthAPI.refreshToken({ refresh })

        this.setAccessToken(response.data.accessToken)

        if (response.data.refreshToken) {
            this.setRefreshToken(response.data.refreshToken)
        }
    }

    async getUserProfile() {
        const response = await AuthAPI.getUserProfile()

        this.setCurrentUser(response.data)
    }

    logout() {
        this.setAccessToken('')
        this.setRefreshToken('')
        this.setCurrentUser(null)
        localStorage.clear()
    }
}
