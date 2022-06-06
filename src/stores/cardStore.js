import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CardStore {
    observingArray = []
    startValuesOfObservingArray = []

    deletedProperties = []

    localArrayOfProperties = []
    saved = false

    prohibitUpdate = false

    organizationOption = null
    ownerOption = null

    userRole = '2'
    cardInfo = {}
    nameOfCard = ''

    constructor() {
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

    addNewProperties(name, propertyId, data = null, id = null) {
        this.observingArray.push({ name, propertyId, data, id })
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
    }

    async getPropertiesFromCardById(id) {
        const listOfProperties = await CardsAPI.getCardsFilledPropertiesById(id).then((res) => res.data)

        this.observingArray = listOfProperties.map((el) => {
            return { ...el, data: JSON.parse(el.data) }
        })

        this.startValuesOfObservingArray = listOfProperties
    }

    async saveProperties() {
        const cardData = {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        }

        if (!this.cardInfo.id) {
            const response = await CardsAPI.createCard(cardData)

            this.setCardInfo(response.data)
        } else {
            const response = await CardsAPI.updateCardById(this.cardInfo.id, cardData)

            this.setCardInfo(response.data)
        }

        const updatedProperties = this.observingArray.filter((prop) => prop.id && !prop.hidden)
        const createdProperties = this.observingArray.filter((prop) => !prop.id && !prop.hidden)
        const deletedProperties = this.deletedProperties.filter((prop) => prop)

        for (const prop of createdProperties) {
            await CardsAPI.createFilledPropertiesByCardId(this.cardInfo.id, prop)
        }

        if (updatedProperties.length) {
            await CardsAPI.updateProperties({
                properties: updatedProperties
            }).catch((e) => console.log(e))
        }

        if (deletedProperties.length) {
            await CardsAPI.deleteProperties(this.cardInfo.id, { properties: deletedProperties })
        }

        this.nameOfCard = this.cardInfo.name

        this.getPropertiesFromCardById(this.cardInfo.id)
    }

    async createNewProperty(cardId, el) {
        await CardsAPI.createFilledPropertiesByCardId(cardId, el)
    }

    deletePropertyLocal(element) {
        this.observingArray = this.observingArray.map((el) => {
            if (el.propertyId === element.propertyId) {
                el.hidden = true
            }

            return el
        })
        
        if (element.id) {
            this.deletedProperties.push(element.id)
        }

        this.setSaved(true)
    }
}
