import API from './config'
 export const organizationsAPI = {
     async getOrganizations() {
         /**
          * Получение возможных организаций
          */

         return API.get('/organizations')
     },
     async getOwnersById(id){
                  /**
          * Получение всех возможныех владельцов по id организации
          */

         return API.get(`/organizations/owners/${id}`)
     }
 }