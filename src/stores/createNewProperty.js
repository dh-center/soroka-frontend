import { makeAutoObservable } from 'mobx'

const arrayWithNewProperties = [
]
export default class CreateNewPropertiesObserver {
    arrayWithNewProperties =[]
    isUserAddNewProperties=false

    constructor() {
        makeAutoObservable(this)
    }

    addNewProperties(name){
        this.arrayWithNewProperties.push({name:name})
        this.isUserAddNewProperties=true
    }
}
