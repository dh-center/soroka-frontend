import API from './config.js'
export const templatesAPI = {
    async getListOfTemplates() {
        return API.get('/cards/templates')
    },
    async getTemplateById(id) {
        /**
         * Использование id шаблона для получения его свойств
         *
         * @param {string}
         */
        return API.get(`/cards/templates/${id}`)
    }
}
