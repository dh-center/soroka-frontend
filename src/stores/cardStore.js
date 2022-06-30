import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'
import { USER_ROLES } from '../utils/constants'

export default class CardStore {
    observingArray = []
    startValuesOfObservingArray = []

    changed = false

    preventDelete = false

    organizationOption = null
    ownerOption = null

    userRole = '2'
    cardInfo = {}
    nameOfCard = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset() {
        this.observingArray = []
        this.startValuesOfObservingArray = []

        this.changed = false

        this.organizationOption = null
        this.ownerOption = null

        this.userRole = '2'
        this.cardInfo = {}
        this.nameOfCard = ''
    }

    setChanged(boolean) {
        this.changed = boolean
    }

    async setOrganiztionAndOwner() {
        const res = await AuthAPI.getUserProfile()
        this.userRole = res.data.userRole

        if (this.userRole === USER_ROLES.admin && !this.cardInfo.id) {
            this.organizationOption = res.data.organization
            this.ownerOption = res.data.id
        } else {
            this.organizationOption = this.cardInfo.organizationId
            this.ownerOption = this.cardInfo.userId
        }
    }

    setCardInfo(data) {
        this.cardInfo = data
        this.nameOfCard = data.name
    }

    setOriginNameOfCard(value) {
        this.nameOfCard = value
    }

    addNewProperties(property) {
        this.observingArray.push({ ...property, validation: true })
        this.setChanged(true)
    }

    changeNameOfCard(value) {
        this.nameOfCard = value
        this.setChanged(true)
    }

    togglePreventDelete() {
        this.cardInfo.preventDelete = !this.cardInfo.preventDelete
        this.setChanged(true)
    }

    setOrganizationOption(value) {
        this.organizationOption = value
        this.setChanged(true)
    }

    setOwnerOption(value) {
        this.ownerOption = value
        this.setChanged(true)
    }

    changeValue(index, newValue, validation) {
        // todo: fix objects mutation mobx (see console)
        this.observingArray[index].data = newValue
        this.observingArray[index].validation = validation
        this.setChanged(true)
    }

    async getPropertiesFromCardById(id) {
        const listOfProperties = await CardsAPI.getCardsFilledPropertiesById(id).then((res) => res.data)

        this.observingArray = listOfProperties.map((el) => {
            return { ...el, data: JSON.parse(el.data), validation: true }
        })

        this.startValuesOfObservingArray = listOfProperties
    }

    async saveProperties() {
        const cardData = {
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: !!this.cardInfo.preventDelete
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
        const deletedProperties = this.observingArray.filter((prop) => prop.id && prop.hidden).map((prop) => prop.id)

        if (deletedProperties.length) {
            await CardsAPI.deleteProperties(this.cardInfo.id, { properties: deletedProperties })
        }

        for (const prop of createdProperties) {
            await CardsAPI.createFilledPropertiesByCardId(this.cardInfo.id, prop)
        }

        if (updatedProperties.length) {
            await CardsAPI.updateProperties({
                // FIXME: надо бы попозже отрефакторить
                properties: updatedProperties.map((property) => {
                    const { id, propertyId, data } = property

                    return { id, propertyId, data }
                })
            }).catch((e) => console.log(e))
        }

        this.nameOfCard = this.cardInfo.name

        this.setChanged(false)
    }

    deletePropertyLocal(element) {
        this.observingArray = this.observingArray.map((el) => {
            if (el.propertyId === element.propertyId) {
                el.hidden = true
            }

            return el
        })

        this.setChanged(true)
    }
}
