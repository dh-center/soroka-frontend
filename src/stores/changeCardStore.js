import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class ChangeCardStore {
    observingArray = []
    startValuesOfObservingArray = []

    localArrayOfProperties = []
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

    addPropertyInLocalArray(name, propertyId, data) {
        this.localArrayOfProperties.push({ name, propertyId, data })
    }

    setOriginNameOfCard(value) {
        this.nameOfCard = value
    }
    addNewProperties(name, propertyId, data,id) {
        this.observingArray.push({ name, propertyId, data,id })
        // this.localArrayOfProperties.push({ name, propertyId, data })
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
        console.log(this.observingArray)
        const resS = await CardsAPI.updateProperties({
            properties: this.observingArray
        }).catch(e=>console.log(e))
        const res = await CardsAPI.updateCardById(this.cardInfo.id, {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        this.nameOfCard = res.data.name
    }
    async createNewProperty(cardId, el) {
        await CardsAPI.createFilledPropertiesByCardId(cardId, el)
    }
    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.data.trim()
        })
    }

    deletePropertyLocal(element) {
        this.observingArray = this.observingArray.filter((el) => {
            return el.propertyId !== element.propertyId
        })
        this.setSaved(true)
    }
}
