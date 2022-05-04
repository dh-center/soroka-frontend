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
    async saveProperties() {
        this.observingArray
            .map(({ name, propertyId, data, id }) => CardsAPI.updatePropertyByPropertyId(id, {name,propertyId,data}))
            // .map((el) => {
            //     console.log(el.propertyId, el)
            // })
            // .then(()=>console.log("good"))
        // console.log(newArray)
    }

    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.data.trim()
        })
    }
}
