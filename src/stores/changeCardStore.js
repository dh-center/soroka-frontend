import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'

export default class ChangeCardStore {
    observingArray = []
    startValuesOfObservingArray = []

    isUserNotChangedProperties = true
    hasEmptyProperties = false

    constructor() {
        this.setHasEmptyProperties()
        makeAutoObservable(this)
    }

    setIsUserNotChangedProperties(index, newValue) {
        // return exampleProperties[index].value === newValue
        return this.startValuesOfObservingArray[index].data === newValue
    }

    changeValue(index, newValue) {
        this.observingArray[index].data = newValue
        this.isUserNotChangedProperties = this.setIsUserNotChangedProperties(index, newValue)
        this.setHasEmptyProperties()
        console.log(this.observingArray[index].data)
    }

    async getPropertiesFromCardById(id) {
        CardsAPI.getCardsFilledPropertiesById(id).then((res) => console.log(res.data))

        const listOfProperties = await CardsAPI.getCardsFilledPropertiesById(id).then((res) => res.data)
        this.observingArray = listOfProperties
        this.startValuesOfObservingArray = listOfProperties
        console.log(this.observingArray, 'SSSSSSSSSSSS')
    }
    async saveProperties(id){
        const newArray = this.observingArray.map(({ name, propertyId,data }) => ( { name, propertyId,data }))
        CardsAPI.createFilledPropertiesByCardId(id,newArray)
        console.log(newArray)
    }

    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.data.trim()
        })
    }
}
