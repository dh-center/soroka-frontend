import API from './config'

const TemplatesAPI = {
    async getTemplates() {
        return API.get('/cards/templates')
    },

    async getTemplateById(id: number) {
        return API.get(`/cards/templates/${id}`)
    }
}

export default TemplatesAPI
