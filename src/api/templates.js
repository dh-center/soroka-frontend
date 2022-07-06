import API from './config.js'
export const TemplatesAPI = {
    async getTemplates() {
        return API.get('/cards/templates')
    },

    async getTemplateById(id) {
        return API.get(`/cards/templates/${id}`)
    }
}
