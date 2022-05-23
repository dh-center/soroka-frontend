import API from './config'
 export const organizationsAPI = {
     async getOrganizations() {
         /**
          * Список всех организаций
          */

         return API.get('/organizations')
     },
     async getOwnersById(id){
         /**
          * Список всех владельцев организации по id организации
          * @param {number} id
          */

         return API.get(`/organizations/owners/${id}`)
     }
 }