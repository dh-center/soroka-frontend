import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'

const exampleProperties = [
    {
        id: 0,
        name: 'Название',
        value: '',
        type: 'text'
    },
    { id: 1, name: 'Сущность', value: '“Петергоф”', type: 'select' },
    { id: 2, name: 'Название', value: '“Петергоф”', type: 'text' },
    {
        id: 3,
        name: 'Юридическое название',
        value: 'Организации ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ КУЛЬТУРЫ "ГОСУДАРСТВЕННЫЙ МУЗЕЙ -ЗАПОВЕДНИК "ПЕТЕРГОФ',
        type: 'text'
    }
]

export default class ChangeCardStore {
    observingArray = exampleProperties
    // observingArray = []

    isUserNotChangedProperties = true
    hasEmptyProperties = false

    constructor() {
        // this.observingArray = CardsAPI.getCardByid().then((res)=>res.data)
        this.exampleProperties = exampleProperties
        this.setHasEmptyProperties()
        makeAutoObservable(this)
    }

    setIsUserNotChangedProperties(index, newValue) {
        return exampleProperties[index].value === newValue
    }

    changeValue(index, newValue) {
        this.observingArray[index].value = newValue
        this.isUserNotChangedProperties = this.setIsUserNotChangedProperties(index, newValue)
        this.setHasEmptyProperties()
    }

    getPropertiesFromCardById(arrayOfProperties){
        this.observingArray = arrayOfProperties
    }

    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || !el.value.trim()
        })
    }
}
