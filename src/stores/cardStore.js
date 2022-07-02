import { makeAutoObservable, runInAction } from 'mobx'
import { CardsAPI } from '../api/cards'
import { authStore, propertiesStore } from '../App'
import { USER_ROLES } from '../utils/constants'

export default class CardStore {
    observingArray = []

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
        const { userRole, organization, id } = authStore.currentUser

        runInAction(() => {
            this.userRole = userRole

            if (this.userRole === USER_ROLES.admin && !this.cardInfo.id) {
                this.organizationOption = organization
                this.ownerOption = id
            } else {
                this.organizationOption = this.cardInfo.organizationId
                this.ownerOption = this.cardInfo.userId
            }
        })
    }

    setCardInfo(data) {
        this.cardInfo = data
        this.nameOfCard = data.name
    }

    setOriginNameOfCard(value) {
        this.nameOfCard = value
    }

    addNewProperties(propertyName) {
        const property = propertiesStore.getPropertyByName(propertyName)
        const propertyType = propertiesStore.getPropertyType(propertyName)
        const data = propertyType.defaultData

        this.observingArray.push({ ...property, data, validation: true })
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
        this.observingArray[index].data = newValue
        this.observingArray[index].validation = validation
        this.observingArray[index].changed = true
        this.setChanged(true)
    }

    async getPropertiesFromCardById(id) {
        const backendData = await CardsAPI.getCardsFilledPropertiesById(id)
        this.setObservingArrayFromBackend(backendData)
    }

    setObservingArrayFromBackend(backendData) {
        this.observingArray = backendData.data.map((el) => {
            return { ...el, data: JSON.parse(el.data), validation: true }
        })
    }

    getApiValuesForProperty({ id, propertyId, data }) {
        return { id, propertyId, data }
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

        const updatedProperties = this.observingArray.filter((prop) => prop.id && !prop.hidden && prop.changed)
        const createdProperties = this.observingArray.filter((prop) => !prop.id && !prop.hidden)
        const deletedProperties = this.observingArray.filter((prop) => prop.id && prop.hidden).map((prop) => prop.id)

        if (deletedProperties.length) {
            await CardsAPI.deleteProperties(this.cardInfo.id, {
                properties: deletedProperties.map(this.getApiValuesForProperty)
            })
        }

        for (const prop of createdProperties) {
            await CardsAPI.createFilledPropertiesByCardId(this.cardInfo.id, this.getApiValuesForProperty(prop))
        }

        if (updatedProperties.length) {
            await CardsAPI.updateProperties({
                properties: updatedProperties.map(this.getApiValuesForProperty)
            }).catch((e) => console.log(e))
        }

        runInAction(() => {
            this.nameOfCard = this.cardInfo.name

            this.observingArray = this.observingArray.map((property) => ({ ...property, changed: false }))
            this.setChanged(false)
        })
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
