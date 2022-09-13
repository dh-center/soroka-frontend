import API from './config'

export const TemplatesAPI = {
    async getTemplates() {
        return API.get('/cards/templates')
    },

    async getTemplateById(id: number) {
        return API.get(`/cards/templates/${id}`)
    }
}
