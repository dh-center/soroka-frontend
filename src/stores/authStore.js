import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'

export default class AuthStore {
    accessToken = ''
    refreshToken = ''

    currentUser = null;

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
        this.currentUser = payload;
    }

    async refresh() {
        const response = await AuthAPI.refreshToken({ refresh: this.refreshToken })

        this.setAccessToken(response.data.accessToken)

        if (response.data.refreshToken) {
            this.setRefreshToken(response.data.refreshToken)
        }
    }

    async getUserProfile() {
        const response = await AuthAPI.getUserProfile()
        console.log(response.data);

        this.setCurrentUser(response.data)
        console.log(this.currentUser);
    }

    logout() {
        this.setAccessToken('')
        this.setRefreshToken('')
        this.setCurrentUser(null)
        localStorage.clear()
    }
}
