import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CreateCardStore {
    nameOfCard = ''
    observingArray = []
    saved = true
    
    prohibitUpdate = false
    organizationOption = '1000'
    ownerOption = '2'

    userRole = '2'
    cardId = 1

    constructor() {
        makeAutoObservable(this)
    }

    async setOrganiztionAndOwner() {
        const res = await AuthAPI.getUserProfile()
        this.organizationOption = res.data.organization
        this.ownerOption = res.data.userRole
        this.userRole = res.data.userRole
    }
    setSaved(boolean){
        this.saved=boolean
    }
    refreshCreatingCard() {
        this.nameOfCard = ''
        this.observingArray = []
        // this.saved = false
        this.prohibitUpdate = false
    }

    addNewProperties(name, propertyId, data) {
        this.setOrganiztionAndOwner()
        this.observingArray.push({ name, propertyId, data })
        this.saved = false
    }
    changeValue(index, newValue) {
        this.observingArray[index].data = newValue
    }
    changeNameOfCard(value) {
        this.nameOfCard = value
        this.saved = false
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
    }

    setOrganizationOption(value) {
        this.organizationOption = value
        this.saved = false
    }

    setOwnerOption(value) {
        this.ownerOption = value
        this.saved = false
    }

    async createNewProperty(cardId, el) {
        await CardsAPI.createFilledPropertiesByCardId(cardId, el)
    }

    async saveCard() {
        console.log(this.observingArray)
        const response = await CardsAPI.createCard({
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        this.cardId = response.data.id
        const promises = this.observingArray
            .map(({ name, propertyId, data }) => ({ name, propertyId, data }))
            .map((el) => this.createNewProperty(this.cardId, el))
        await Promise.all(promises)
        this.saved = true
    }
    deletePropertyLocal(element) {

        this.observingArray =  this.observingArray.filter((el)=>{
            return el.propertyId!==element.propertyId})
        console.log(this.observingArray)
    }
}
