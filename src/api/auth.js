/* Модуль API по запросам связанным с авторизацией */

import API from './config'

export const AuthAPI = {
    async register(data) {
        /**
         * Регистрация пользователя
         *
         * @param {string} data.name
         * @param {string} data.email
         * @param {string} data.password
         * @param {string} data.timezone
         * @param {boolean} data.hasAcceptTermsOfUse
         * @param {boolean} data.userRole
         * @param {boolean} data.organization
         */

        return API.post('/users/', data)
    },

    async login(data) {
        /**
         * Авторизация пользователя
         *
         * @param {string} data.email
         * @param {string} data.password
         */

        return API.post('/users/login', data)
    },

    async refreshToken(data) {
        /**
         * Обновление токена
         *
         * @param {string} data.refreshToken
         */

        return API.post('/users/refresh', data)
    },

    async getAuthLink(uuid) {
        /**
         * Использование authorization-link из письма
         *
         * @param {string} uuid
         */

        return API.get(`/authorization-link/${uuid}`)
    },

    async getUserProfile() {
        /**
         * Получение информации о пользователе
         */

        return API.get('/users/profile')
    },

    async setUserPassword(uuid, data) {
        /**
         * Устанавливает юзеру пароль при регистрации
         * @param {string} password
         * @param {string} rePassword
         */

        return API.post(`/authorization-link/${uuid}`, data)
    },

    async acceptsTermsOfUse(data) {
        /**
         * Проставляет пользователю termsOfUse
         *
         * @param {boolean} hasAcceptTermsOfUse
         * @param {boolean} hasAcceptTermsOfUse
         */

        return API.post('/users/accept-terms', data)
    }
}
