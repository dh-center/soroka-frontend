import { makeAutoObservable, runInAction } from 'mobx'
import { CardsAPI } from '../api/cards'
import { USER_ROLES } from '../utils/constants'

import { authStore, propertiesStore } from './rootStore'

type CardInfo = {
    id: number
    name: string
    preventDelete: boolean
    organizationId: number
    userId: number
    createdAt: string
    updateAt: string
}

export default class CardStore {
    observingArray: any[] = []

    changed = false

    preventDelete = false

    organizationOption?: number
    ownerOption?: number

    userRole = 2
    cardInfo: CardInfo = {} as CardInfo
    nameOfCard = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset() {
        this.observingArray = []

        this.changed = false

        this.organizationOption = undefined
        this.ownerOption = undefined

        this.userRole = 2
        this.cardInfo = {} as CardInfo
        this.nameOfCard = ''
    }

    setChanged(boolean: boolean) {
        this.changed = boolean
    }

    async setOrganiztionAndOwner() {
        if (authStore.currentUser) {
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
    }

    setCardInfo(data: CardInfo) {
        this.cardInfo = data
        this.nameOfCard = data.name
    }

    setOriginNameOfCard(value: string) {
        this.nameOfCard = value
    }

    addNewProperties(propertyName: string) {
        const property = propertiesStore.getPropertyByName(propertyName)
        const propertyType = propertiesStore.getPropertyType(propertyName)
        const data = propertyType.defaultData

        this.observingArray.push({ ...property, data, validation: true })
        this.setChanged(true)
    }

    changeNameOfCard(value: string) {
        this.nameOfCard = value
        this.setChanged(true)
    }

    togglePreventDelete() {
        this.cardInfo.preventDelete = !this.cardInfo.preventDelete
        this.setChanged(true)
    }

    setOrganizationOption(value: string) {
        this.organizationOption = !!Number(value) ? +value : undefined
        this.setChanged(true)
    }

    setOwnerOption(value: string) {
        this.ownerOption = !!Number(value) ? +value : undefined
        this.setChanged(true)
    }

    changeValue(index: number, newValue: any, validation: any) {
        this.observingArray[index].data = newValue
        this.observingArray[index].validation = validation
        this.observingArray[index].changed = true
        this.setChanged(true)
    }

    fillWithTemplate(templateName: string | null) {
        const template = propertiesStore.getTemplateByName(templateName)
        if (template) {
            template.propertiesList.forEach(({ name }: any) => this.addNewProperties(name))
        }
    }

    async getPropertiesFromCardById(id: string) {
        const backendData = await CardsAPI.getCardsFilledPropertiesById(id)
        this.setObservingArrayFromBackend(backendData)
    }

    setObservingArrayFromBackend(backendData: any) {
        this.observingArray = backendData.data.map((el: any) => {
            return { ...el, data: JSON.parse(el.data), validation: true }
        })
    }

    getApiValuesForProperty({ id, propertyId, data }: any) {
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
            // watch out, delete has another format, just array of properties ids
            await CardsAPI.deleteProperties(this.cardInfo.id, {
                properties: deletedProperties
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

    deletePropertyLocal(element: any) {
        this.observingArray = this.observingArray.map((el) => {
            if (el.propertyId === element.propertyId) {
                el.hidden = true
            }

            return el
        })

        this.setChanged(true)
    }
}
