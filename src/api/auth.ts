/* Модуль API по запросам связанным с авторизацией */
// TODO: Dependency cycle
import API from './config'

export type User = {
    id: number
    name: string
    email: string
    hasAcceptTermsOfUse: boolean
    organization: number
    userRole: number
}

type RegisterData = {
    name: string
    email: string
    password: string
    timezone?: string
    hasAcceptTermsOfUse: boolean
    userRole: number
    organization: number
}

export type LoginData = {
    email: FormDataEntryValue
    password: FormDataEntryValue
}

type RefreshTokenData = {
    refreshToken: string
}

export type UserPasswordData = {
    password: FormDataEntryValue
    rePassword: FormDataEntryValue
}

type AcceptsTermsOfUseData = {
    hasAcceptTermsOfUse: boolean
    userId: number
}

export const AuthAPI = {
    async register(data: RegisterData) {
        /**
         * Регистрация пользователя
         *
         * @param {string} data.name
         * @param {string} data.email
         * @param {string} data.password
         * @param {string} data.timezone
         * @param {boolean} data.hasAcceptTermsOfUse
         * @param {number} data.userRole
         * @param {number} data.organization
         */

        return API.post('/users/', data)
    },

    async login(data: LoginData) {
        /**
         * Авторизация пользователя
         *
         * @param {string} data.email
         * @param {string} data.password
         */

        return API.post('/users/login', data)
    },

    async refreshToken(data: RefreshTokenData) {
        /**
         * Обновление токена
         *
         * @param {string} data.refreshToken
         */

        return API.post('/users/refresh', data)
    },

    async getAuthLink(uuid: string | undefined) {
        /**
         * Использование authorization-link из письма
         *
         * @param {string} uuid
         */

        return API.get(`/authorization-link/${uuid}`)
    },

    /**
     * Получение информации о пользователе
     */
    async getUserProfile() {
        return API.get<User>('/users/profile', { cache: false })
    },

    async setUserPassword(uuid: string | undefined, data: UserPasswordData) {
        /**
         * Устанавливает юзеру пароль при регистрации
         * @param {string} password
         * @param {string} rePassword
         */

        return API.post(`/authorization-link/${uuid}`, data)
    },

    async acceptsTermsOfUse(data: AcceptsTermsOfUseData) {
        /**
         * Проставляет пользователю termsOfUse
         *
         * @param {boolean} hasAcceptTermsOfUse
         * @param {number} userId
         */

        return API.post('/users/accept-terms', data)
    }
}
