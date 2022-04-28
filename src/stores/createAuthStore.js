import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'

export default class CreateAuthStore {
    accessToken = ''
    refreshToken = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAccessToken(payload) {
        this.accessToken = payload
    }

    setRefreshToken(payload) {
        this.refreshToken = payload
    }

    async refresh() {
        const response = await AuthAPI.refreshToken({ refresh: this.refreshToken })

        this.setAccessToken(response.data.accessToken)

        if (response.data.refreshToken) {
            this.setRefreshToken(response.data.refreshToken)
        }
    }
}
