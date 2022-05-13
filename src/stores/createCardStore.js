import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CreateCardStore {
    nameOfCard = ''
    arrayWithNewProperties = []
    isUserAddNewProperties = false

    prohibitUpdate = false
    organizationOption = '1000'
    ownerOption = '1000'

    cardId = 1

    constructor() {
        makeAutoObservable(this)
    }

    async setOrganiztionAndOwner() {
        const res = await AuthAPI.getUserProfile()
        this.organizationOption = res.data.organization
        this.ownerOption = res.data.userRole
    }

    refreshCreatingCard() {
        this.nameOfCard = ''
        this.arrayWithNewProperties = []
        this.isUserAddNewProperties = false
        this.prohibitUpdate = false
    }

    addNewProperties(name, propertyId, data) {
        this.setOrganiztionAndOwner()
        this.arrayWithNewProperties.push({ name, propertyId, data })
        this.isUserAddNewProperties = true
    }
    changeValue(index, newValue) {
        this.arrayWithNewProperties[index].data = newValue
    }
    changeNameOfCard(value) {
        this.nameOfCard = value
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
    }

    setOrganizationOption(value) {
        this.organizationOption = value
    }

    setOwnerOption(value) {
        this.ownerOption = value
    }

    async saveCard() {
        const response = await CardsAPI.createCard({
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        this.cardId = response.data.id
        this.arrayWithNewProperties
            .map(({ name, propertyId, data }) => ({ name, propertyId, data }))
            .map((el) => {
                CardsAPI.createFilledPropertiesByCardId(this.cardId, el)
            })
    }
}
