import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class ChangeCardStore {
    observingArray = []
    startValuesOfObservingArray = []

    deletedProperties = []

    localArrayOfProperties = []
    saved = false
    hasEmptyProperties = false

    prohibitUpdate = false

    organizationOption = null
    ownerOption = null
    observingArrayLenght = 0

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

    updateObservigArrayLenght() {
        this.observingArrayLenght = this.observingArray.length
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

    addNewProperties(name, propertyId, data = null, id = null) {
        this.observingArray.push({ name, propertyId, data, id })
        // this.localArrayOfProperties.push({ name, propertyId, data })
        this.updateObservigArrayLenght()
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
        this.updateObservigArrayLenght()
        this.startValuesOfObservingArray = listOfProperties
    }

    async saveProperties() {
        const updatedProperties = this.observingArray.filter((prop) => prop.id)
        const createdProperties = this.observingArray.filter((prop) => !prop.id)
        const deletedProperties = this.deletedProperties.filter((prop) => prop)

        for (const prop of createdProperties) {
            await CardsAPI.createFilledPropertiesByCardId(this.cardInfo.id, prop)
        }

        await CardsAPI.updateProperties({
            properties: updatedProperties
        }).catch((e) => console.log(e))

        if (deletedProperties.length) {
            await CardsAPI.deleteProperties(this.cardInfo.id, { properties: deletedProperties })
        }

        const res = await CardsAPI.updateCardById(this.cardInfo.id, {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })

        this.nameOfCard = res.data.name

        this.getPropertiesFromCardById(this.cardInfo.id)
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
            return el.id !== element.id
        })
        this.updateObservigArrayLenght()
        this.deletedProperties.push(element.id)

        this.setSaved(true)
    }
}
