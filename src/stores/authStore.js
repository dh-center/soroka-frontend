import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'

export default class AuthStore {
    accessToken = ''
    refreshToken = ''

    currentUser = null

    incorrectPassword = false

    constructor() {
        makeAutoObservable(this)
    }

    setAccessToken(payload) {
        this.accessToken = payload
        localStorage.setItem('accessToken', payload)
    }

    setRefreshToken(payload) {
        this.refreshToken = payload
    }

    setCurrentUser(payload) {
        this.currentUser = payload
    }

    setIncorrectPassword(payload) {
        this.incorrectPassword = payload
        console.log(this.incorrectPassword);
    }

    async refresh() {
        const refreshToken = this.refreshToken || localStorage.getItem('refreshToken')
        const response = await AuthAPI.refreshToken({ refreshToken })

        this.setAccessToken(response.data.accessToken)

        if (response.data.refreshToken) {
            this.setRefreshToken(response.data.refreshToken)
        }
    }

    async getUserProfile() {
        const response = await AuthAPI.getUserProfile()

        this.setCurrentUser(response.data)
    }

    async getUserData(token) {
        const response = await AuthAPI.getAuthLink(token)

        this.setCurrentUser(response.data)
        return response.data;
    }

    async acceptsTermsOfUse(isAccepted) {
        const response = await AuthAPI.acceptsTermsOfUse({
            hasAcceptTermsOfUse: isAccepted,
            userId: this.currentUser.id
        })

        this.setCurrentUser(response.data)
        return response.data
    }

    async setUserPassword(uuid, data) {
        const response = await AuthAPI.setUserPassword(uuid, data)

        if (response.status === 204) {
            return true;
        }
    }

    async login(data) {
        try {
            this.setIncorrectPassword(false)

            const response = await AuthAPI.login(data)
            return response.data;
        } catch (e) {
            this.setIncorrectPassword(true)
        }
    }

    logout() {
        this.setAccessToken('')
        this.setRefreshToken('')
        this.setCurrentUser(null)
        localStorage.clear()
    }
}
