import { makeAutoObservable, observable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class ChangeCardStore {
    observingArray = []
    startValuesOfObservingArray = []

    saved = false
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

    setSaved(boolean) {
        this.saved = boolean
    }
    setIsUserNotChangedProperties(index, newValue) {
        return this.startValuesOfObservingArray[index]?.data === newValue
    }
    async setOrganiztionAndOwner() {
        const res = await AuthAPI.getUserProfile()
        this.organizationOption = res.data.organization
        this.ownerOption = res.data.userRole
        this.userRole = res.data.userRole
    }
    setCardInfo(data) {
        this.cardInfo = data
        this.nameOfCard = data.name
    }

    setOriginNameOfCard(value) {
        this.nameOfCard = value
    }
    addNewProperties(name, propertyId, data) {
        this.observingArray.push({ name, propertyId, data })
        this.setSaved(true)
    }
    changeNameOfCard(value) {
        this.nameOfCard = value
        this.setSaved(true)
    }
    checkDataIsEmpty(el) {
        if (el.data.trim() === '') return true
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
        this.setSaved(true)
    }
    setOrganizationOption(value) {
        this.organizationOption = value
        this.setSaved(true)
    }

    setOwnerOption(value) {
        this.ownerOption = value
        this.setSaved(true)
    }
    changeValue(index, newValue) {
        this.observingArray[index].data = newValue
        this.setSaved(!this.setIsUserNotChangedProperties(index, newValue))

        this.setHasEmptyProperties()
    }

    async getPropertiesFromCardById(id) {
        const listOfProperties = await CardsAPI.getCardsFilledPropertiesById(id).then((res) => res.data)
        this.observingArray = listOfProperties.map((el) => {
            return { ...el, data: JSON.parse(el.data) }
        })
        this.startValuesOfObservingArray = listOfProperties
    }

    async saveProperties() {
        this.observingArray.map(({ name, propertyId, data, id }) => {
            if (id) {
                CardsAPI.updatePropertyById(id, { name, propertyId, data })
            }
        })
        const res = await CardsAPI.updateCardById(this.cardInfo.id, {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        this.nameOfCard = res.data.name
    }

    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.data.trim()
        })
    }

    deletePropertyLocal(id) {
        this.observingArray.copyWithin().forEach((el, index) => {
            if (el.id === id) {
                this.observingArray.splice(index, 1)
                this.saved = false
            }
        })
    }
}
