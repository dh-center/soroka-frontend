import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CreateCardStore {
    nameOfCard = ''
    arrayWithNewProperties = []
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
        console.log(res.data)
        this.organizationOption = res.data.organization
        this.ownerOption = res.data.userRole
        this.userRole = res.data.userRole
    }

    refreshCreatingCard() {
        this.nameOfCard = ''
        this.arrayWithNewProperties = []
        this.saved = true
        this.prohibitUpdate = false
    }

    addNewProperties(name, propertyId, data) {
        this.setOrganiztionAndOwner()
        this.arrayWithNewProperties.push({ name, propertyId, data })
        this.saved = false
    }
    changeValue(index, newValue) {
        this.arrayWithNewProperties[index].data = newValue
    }
    changeNameOfCard(value) {
        this.nameOfCard = value
        this.saved = true
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
        this.saved = true
    }

    setOrganizationOption(value) {
        this.organizationOption = value
        this.saved = true
    }

    setOwnerOption(value) {
        this.ownerOption = value
        this.saved = true
    }

    async createNewProperty(cardId, el) {
        await CardsAPI.createFilledPropertiesByCardId(cardId, el)
    }

    async saveCard() {
        const response = await CardsAPI.createCard({
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        this.cardId = response.data.id
        const promises = this.arrayWithNewProperties
            .map(({ name, propertyId, data }) => ({ name, propertyId, data }))
            .map((el) => this.createNewProperty(this.cardId, el))
        await Promise.all(promises)
        this.saved = true
    }
    deletePropertyLocal(id) {
        this.arrayWithNewProperties.copyWithin().forEach((el, index) => {
            if (el.id === id) {
                this.arrayWithNewProperties.splice(index, 1)
            }
        })
    }
}
