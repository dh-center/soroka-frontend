/* Модуль API по запросам к карточкам */

import { DEFAULT_ORGANIZATION_FILTER_VALUE } from '../utils/constants'
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

    async getCardsFilledPropertiesById(cardId: string) {
        /**
         * Получение свойств по карточке
         *
         * @param {number} cardId
         */

        return API.get(`/cards/filled-properties/${cardId}`, { cache: false })
    },

    async createFilledPropertiesByCardId(cardId: number, data: any) {
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

    async deleteFilledPropertiesByCardId(cardId: number, data: any) {
        /**
         * Удаления свойства у карточки
         *
         * @param {number} cardId
         */

        return API.delete(`/cards/filled-properties/${cardId}`, { data })
    },

    /**
     * Получение списка карточек
     *
     * @param {number} params.offset Офсет списка карточек
     * @param {number} params.limit Максимальное число карточек в результате
     */
    async getCardsList(params: { offset: number; limit: number }) {
        return API.get('/cards', { params, cache: false })
    },
    async getCardsByOrganizationId(params: { offset: number; limit: number }, orgId: number) {
        return API.get(`cards/by-org/${orgId}`, { params, cache: false })
    },
    async getCardsByParameters(organizationId: number | string, offset: number, limit: number) {
        if (organizationId === DEFAULT_ORGANIZATION_FILTER_VALUE) {
            return CardsAPI.getCardsList({ offset, limit })
        }
        return CardsAPI.getCardsByOrganizationId({ offset, limit }, +organizationId)
    },

    async createCard(data: any) {
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

    async getCardByid(cardId: string) {
        /**
         * Получение карточки по ее id
         *
         * @param {number} cardId
         */

        return API.get(`/cards/by-id/${cardId}`, { cache: false })
    },

    async updateCardById(cardId: number, data: any) {
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

    async updatePropertyById(id: number, data: any) {
        /**
         * Обновление свойства по его id
         *
         * @param {number} propertyId
         * @param {string} data.name
         * @param {number} data.propertyId
         * @param {string} data.data
         */
        return API.patch(`/cards/filled-properties/by-id/${id}`, data)
    },
    async updateProperties(data: any) {
        /**
         * Обновление свойства массивом
         *

         * @param {object} data.data
         */
        return API.patch(`/cards/filled-properties/bulk/update`, data)
    },
    async deleteProperties(cardId: number, data: any) {
        /**
         * Удаление свойства массивом
         *
         *  @param {string} cardId
         * @param {object} data
         */
        return API.delete(`/cards/filled-properties/bulk/delete/${cardId}`, { data })
    }
}
