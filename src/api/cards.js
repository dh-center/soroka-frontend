/* Модуль API по запросам к карточкам */

import API from './config'

export const CardsAPI = {
    async getCardsDataTypes() {
        /**
         * Получение типов для свойств
         */

        return API.get('/cards/data-types')
    },

    async getCardsProperties() {
        /**
         * Получение свойств
         */

        return API.get('/cards/properties')
    },

    async getCardsFilledPropertiesById(cardId) {
        /**
         * Получение свойств по карточке
         *
         * @param {number} cardId
         */

        return API.get(`/cards/filled-properties/${cardId}`)
    },

    async createFilledPropertiesByCardId(cardId, data) {
        /**
         * Дополнение свойства к карточке
         *
         * @param {number} cardId
         * @param {string} data.name
         * @param {number} data.propertyId
         * @param {string} data.data
         */

        return API.post(`/cards/filled-properties/${cardId}`, data)
    },

    async deleteFilledPropertiesByCardId(cardId, data) {
        /**
         * Удаления свойства у карточки
         *
         * @param {number} cardId
         */

        return API.delete(`/cards/filled-properties/${cardId}`, data)
    },

    async getCardsList() {
        /**
         * Получение списка карточек
         */

        return API.get('/cards')
    },

    async createCard(data) {
        /**
         * Создание карточки
         *
         * @param {string} data.name
         * @param {number} data.userId
         * @param {number} data.organizationId
         * @param {boolean} data.preventDelete
         */

        return API.post('/cards', data)
    },

    async getCardByid(cardId) {
        /**
         * Получение карточки по ее id
         *
         * @param {number} cardId
         */

        return API.get(`/cards/by-id/${cardId}`)
    },

    async updateCardById(cardId, data) {
        /**
         * Обновление карточки по ее id
         *
         * @param {number} cardId
         * @param {string} data.name
         * @param {number} data.userId
         * @param {number} data.organizationId
         * @param {boolean} data.preventDelete
         */

        return API.patch(`/cards/by-id/${cardId}`, data)
    },

    async updatePropertyById(id, data) {
        /**
         * Обновление свойства по его id
         *
         * @param {number} propertyId
         * @param {string} data.name
         * @param {number} data.propertyId
         * @param {string} data.data
         */
        return API.patch(`/cards/filled-properties/by-id/${id}`, data)
    }
}
