import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class ChangeCardStore {
    observingArray = []
    startValuesOfObservingArray = []

    isUserNotChangedProperties = true
    hasEmptyProperties = false

    prohibitUpdate = false

    organizationOption = '1000'
    ownerOption = '2'

    userRole = '2'
    cardInfo = {}
    nameOfCard = ''
    constructor() {
        this.setHasEmptyProperties()
        makeAutoObservable(this)
    }

    setIsUserNotChangedProperties(index, newValue) {
        return this.startValuesOfObservingArray[index].data === newValue
    }
    async setOrganiztionAndOwner() {
        const res = await AuthAPI.getUserProfile()
        console.log(res.data)
        this.organizationOption = res.data.organization
        this.ownerOption = res.data.userRole
        this.userRole = res.data.userRole
    }
    setCardInfo(data) {
        this.cardInfo = data
        this.nameOfCard = data.name
    }

    changeNameOfCard(value) {
        this.nameOfCard = value
        this.isUserNotChangedProperties = false
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
        this.isUserNotChangedProperties = false
    }
    setOrganizationOption(value) {
        this.organizationOption = value
        this.isUserNotChangedProperties = false
    }

    setOwnerOption(value) {
        this.ownerOption = value
        this.isUserNotChangedProperties = false
    }
    changeValue(index, newValue) {
        this.observingArray[index].data = newValue
        this.isUserNotChangedProperties = this.setIsUserNotChangedProperties(index, newValue)
        this.setHasEmptyProperties()
    }

    async getPropertiesFromCardById(id) {
        const listOfProperties = await CardsAPI.getCardsFilledPropertiesById(id).then((res) => res.data)
        this.observingArray = listOfProperties
        this.startValuesOfObservingArray = listOfProperties
    }

    async saveProperties() {
        this.observingArray.map(({ name, propertyId, data, id }) =>
            CardsAPI.updatePropertyById(id, { name, propertyId, data })
        )
        CardsAPI.updateCardById(this.cardInfo.id, {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
    }

    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.data.trim()
        })
    }
}
