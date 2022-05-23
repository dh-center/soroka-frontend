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
    checkDataIsEmpty(el){
        if(el.data.trim() === "") return true
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
        console.log(this.observingArray[index].data)
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
        console.log(this.nameOfCard,this.ownerOption,this.organizationOption,this.prohibitUpdate)
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

    deletePropertyLocal(id){
        this.observingArray
        .copyWithin()
        .forEach((el,index)=>{
            if (el.id ===id){
                console.log(id,index)
                console.log(this.observingArray)
                this.observingArray.splice(index,1)
                console.log(this.observingArray,"SSSSSSS")
                this.isUserNotChangedProperties= false
            }
        })
    }
}
