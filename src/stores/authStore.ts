import { makeAutoObservable } from 'mobx'
// TODO: Dependency cycle
import { AuthAPI, LoginData, User, UserPasswordData } from '../api/auth'

export default class AuthStore {
    // TODO не хранить токены в localStorage
    accessToken: string = localStorage.getItem('accessToken') || ''

    refreshToken: string = localStorage.getItem('refreshToken') || ''

    currentUser: User | null = null

    invitationData: User | null = null

    incorrectPassword = false

    constructor() {
        makeAutoObservable(this)
    }

    setAccessToken(payload: string) {
        this.accessToken = payload
        localStorage.setItem('accessToken', payload)
    }

    setRefreshToken(payload: string) {
        this.refreshToken = payload
        localStorage.setItem('refreshToken', payload)
    }

    setCurrentUser(payload: User | null) {
        this.currentUser = payload
    }

    setInivitationData(payload: User) {
        this.invitationData = payload
    }

    setIncorrectPassword(payload: boolean) {
        this.incorrectPassword = payload
    }

    async refresh() {
        const refreshToken = this.refreshToken || localStorage.getItem('refreshToken') || ''
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

    async getInvatationData(token: string | undefined) {
        const response = await AuthAPI.getAuthLink(token)
        this.setInivitationData(response.data)
        return response.data
    }

    async acceptsTermsOfUse(isAccepted: boolean) {
        let response
        if (this.invitationData?.id) {
            response = await AuthAPI.acceptsTermsOfUse({
                hasAcceptTermsOfUse: isAccepted,
                userId: this.invitationData.id
            })
            this.setInivitationData(response.data)
            return response.data
        }
        return response
    }

    static async setUserPassword(uuid: string | undefined, data: UserPasswordData) {
        const response = await AuthAPI.setUserPassword(uuid, data)

        if (response.status === 204) {
            return true
        }
        return false
    }

    async login(data: LoginData) {
        try {
            this.setIncorrectPassword(false)

            const response = await AuthAPI.login(data)
            return response.data
        } catch (e) {
            this.setIncorrectPassword(true)
        }
        return false
    }

    logout() {
        this.setAccessToken('')
        this.setRefreshToken('')
        this.setCurrentUser(null)
        localStorage.clear()
    }
}
