import API from './config'

const organizationsAPI = {
    /**
     * Список всех организаций
     */
    async getOrganizations() {
        return API.get('/organizations')
    },

    /**
     * Список всех владельцев организации по id организации
     * @param {number} id
     */
    async getOwnersById(id: number | undefined) {
        return API.get(`/organizations/owners/${id}`)
    }
}

export default organizationsAPI
