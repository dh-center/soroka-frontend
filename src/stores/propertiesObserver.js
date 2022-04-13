import { makeAutoObservable } from "mobx"

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
export default class PropertiesObserver {
    observingArray = exampleProperties
    isUserNotChangedProperties = true
    hasEmptyProperties = false

    constructor() {
        this.exampleProperties = exampleProperties
        this.setHasEmptyProperties()
        makeAutoObservable(this)
    }

    setIsUserNotChangedProperties(index, newValue) {
        console.log('cerf', exampleProperties[index].value, newValue)
        if (exampleProperties[index].value != newValue) return false
        else return true
    }
    changeValue(index, newValue) {
        this.observingArray[index].value = newValue
        this.isUserNotChangedProperties = this.setIsUserNotChangedProperties(index, newValue)
        this.setHasEmptyProperties()
    }
    setHasEmptyProperties() {
        this.hasEmptyProperties = false
        this.observingArray.forEach((el) => {
            this.hasEmptyProperties = this.hasEmptyProperties || el.value.length === 0 || !el.value.trim()
        })
    }
}
