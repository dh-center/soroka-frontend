import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CreateCardStore {
    nameOfCard = ''
    arrayWithNewProperties = []
    isUserAddNewProperties = false

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
    deletePropertyLocal(id) {
        this.arrayWithNewProperties.copyWithin().forEach((el, index) => {
            if (el.id === id) {
                console.log(id, index)
                console.log(this.observingArray)
                this.arrayWithNewProperties.splice(index, 1)
                console.log(this.observingArray, 'SSSSSSS')
            }
        })
    }
}
